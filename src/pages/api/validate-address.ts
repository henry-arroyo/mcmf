import { NextApiRequest, NextApiResponse } from 'next';
import { XMLParser } from 'fast-xml-parser';

const USPS_USER_ID = process.env.USPS_USER_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { streetAddress, city, state, zipCode } = req.body;

  if (!streetAddress || !city || !state || !zipCode) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!USPS_USER_ID) {
    console.error('USPS_USER_ID is not configured');
    return res.status(500).json({ message: 'Address validation service is not configured' });
  }

  try {
    // Create XML request for USPS Address Validation API
    const xml = `
      <AddressValidateRequest>
        <Revision>1</Revision>
        <Address>
          <Address1>${streetAddress}</Address1>
          <Address2></Address2>
          <City>${city}</City>
          <State>${state}</State>
          <Zip5>${zipCode}</Zip5>
          <Zip4></Zip4>
        </Address>
      </AddressValidateRequest>
    `;

    // Make request to USPS API
    const response = await fetch(
      `https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${encodeURIComponent(xml)}&USERID=${USPS_USER_ID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/xml',
        },
      }
    );

    if (!response.ok) {
      throw new Error('USPS API request failed');
    }

    const xmlResponse = await response.text();
    const parser = new XMLParser();
    const result = parser.parse(xmlResponse);

    // Check if there's an error in the response
    if (result.AddressValidateResponse?.Address?.Error) {
      return res.status(200).json({
        isValid: false,
        message: result.AddressValidateResponse.Address.Error.Description || 'Invalid address',
      });
    }

    // If no error, the address is valid
    const validatedAddress = {
      streetAddress: result.AddressValidateResponse?.Address?.Address1,
      city: result.AddressValidateResponse?.Address?.City,
      state: result.AddressValidateResponse?.Address?.State,
      zipCode: result.AddressValidateResponse?.Address?.Zip5,
    };

    // Check if any of the validated fields are empty
    if (Object.values(validatedAddress).some(value => !value)) {
      return res.status(200).json({
        isValid: false,
        message: 'Address validation returned incomplete data',
      });
    }

    return res.status(200).json({
      isValid: true,
      validatedAddress,
    });
  } catch (error) {
    console.error('Error validating address:', error);
    return res.status(500).json({ 
      message: 'Error validating address',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 