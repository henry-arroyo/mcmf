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
      `http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${encodeURIComponent(xml)}`,
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

    // Check if address is valid
    const isValid = !result.AddressValidateResponse?.Address?.Error;

    return res.status(200).json({
      isValid,
      validatedAddress: isValid ? {
        streetAddress: result.AddressValidateResponse?.Address?.Address1,
        city: result.AddressValidateResponse?.Address?.City,
        state: result.AddressValidateResponse?.Address?.State,
        zipCode: result.AddressValidateResponse?.Address?.Zip5,
      } : null,
    });
  } catch (error) {
    console.error('Error validating address:', error);
    return res.status(500).json({ message: 'Error validating address' });
  }
} 