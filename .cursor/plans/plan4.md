## PART 4: Test Your Deployment (15 minutes)

### Step 4.1: Access Your Application

1. Open browser and go to: `https://yourdomain.com`
2. You should see Postiz login page
3. If you see SSL error, wait 5-10 minutes for certificate to propagate

### Step 4.2: Create Your Account

1. Click "Sign Up" or "Create Account"
2. Fill in:

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Email
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Password
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Organization name

3. Click "Create Account"
4. Check your email for verification (if Resend is configured)
5. Verify your email and login

### Step 4.3: Connect Social Media Accounts

1. After login, click "Add Channel" or "Connect Account"
2. Select a platform (e.g., Twitter)
3. Click "Connect"
4. Authorize the OAuth connection
5. You should see "Successfully connected!"

### Step 4.4: Test Posting

1. Click "Create Post"
2. Write a test message
3. Select your connected account
4. Click "Schedule" or "Post Now"
5. If scheduling, check that cron jobs are running:
   ```bash
   # In your server SSH
   docker ps | grep postiz
   ```
