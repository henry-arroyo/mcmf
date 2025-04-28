# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

All shadcn/ui components have been downloaded under `@/components/ui`.

## Commands

**Install Dependencies**

```shell
pnpm i
```

**Start Preview**

```shell
pnpm run dev
```

**To build**

```shell
Pnpm run build
```

# Maui Classical Music Festival Website

## Git Repository Setup

### Initial Setup

1. **Make the setup script executable**
   ```bash
   chmod +x setup-git.sh
   ```

2. **Run the setup script**
   ```bash
   ./setup-git.sh
   ```

3. **Follow the prompts**
   - Enter your Git repository URL when prompted
   - The script will initialize the repository and push the initial commit

### Making Changes

1. **Create a new branch for your changes**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit them**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a pull request**
   - Go to your Git repository website
   - Create a pull request from your feature branch to main
   - Get code review and approval
   - Merge the changes

### AWS Deployment

After merging changes to the main branch, the changes will be automatically deployed to AWS Amplify.

## AWS Deployment Instructions

### Prerequisites
1. AWS Account
2. AWS CLI installed and configured
3. Node.js and npm installed
4. Git installed

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_AWS_REGION=your_aws_region
```

### Deployment Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Deploy to AWS**
   ```bash
   # Make the deployment script executable
   chmod +x deploy.sh
   
   # Run the deployment script
   ./deploy.sh
   ```

4. **Follow the Amplify CLI prompts**
   - Choose your AWS profile
   - Select your region
   - Choose a project name
   - Select the hosting environment (dev/prod)

### Manual Deployment (Alternative)

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Add Hosting**
   ```bash
   amplify add hosting
   ```

4. **Deploy**
   ```bash
   amplify publish
   ```

### Post-Deployment

1. **Configure Custom Domain (Optional)**
   - Go to AWS Amplify Console
   - Select your app
   - Go to Domain Management
   - Add your custom domain
   - Follow the DNS configuration instructions

2. **Set Up Environment Variables**
   - Go to AWS Amplify Console
   - Select your app
   - Go to Environment Variables
   - Add your environment variables

3. **Enable HTTPS**
   - HTTPS is automatically enabled for Amplify hosting
   - For custom domains, SSL certificate is automatically provisioned

### Monitoring and Maintenance

1. **View Logs**
   - Go to AWS Amplify Console
   - Select your app
   - Go to Hosting
   - Click on "View logs"

2. **Monitor Performance**
   - Use AWS CloudWatch for monitoring
   - Set up alarms for critical metrics

3. **Update Deployment**
   - Push changes to your repository
   - Amplify will automatically deploy updates
   - Or use `amplify publish` for manual deployment

### Troubleshooting

1. **Build Failures**
   - Check build logs in Amplify Console
   - Verify all dependencies are in package.json
   - Ensure environment variables are set correctly

2. **Deployment Issues**
   - Check AWS CLI configuration
   - Verify IAM permissions
   - Check network connectivity

3. **Runtime Errors**
   - Check browser console for errors
   - Review CloudWatch logs
   - Verify environment variables

### Security Considerations

1. **Environment Variables**
   - Never commit .env files
   - Use AWS Secrets Manager for sensitive data
   - Rotate credentials regularly

2. **Access Control**
   - Use IAM roles with least privilege
   - Enable MFA for AWS accounts
   - Regularly audit access logs

3. **SSL/TLS**
   - Keep SSL certificates up to date
   - Use secure headers
   - Enable HSTS

### Backup and Recovery

1. **Regular Backups**
   - Enable automatic backups in Amplify
   - Store backups in S3
   - Test recovery procedures

2. **Disaster Recovery**
   - Document recovery procedures
   - Test recovery regularly
   - Maintain backup copies

### Cost Optimization

1. **Resource Management**
   - Monitor usage patterns
   - Scale resources appropriately
   - Use auto-scaling when possible

2. **Cost Monitoring**
   - Set up cost alerts
   - Review AWS Cost Explorer
   - Optimize resource usage

## Support

For deployment issues or questions, please contact the development team or refer to the AWS documentation.
