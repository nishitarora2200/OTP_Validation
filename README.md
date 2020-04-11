# OTP_Validation
1. Steps to Start Project.
2. To test the Nodemailer Fill your EmailId and password from which you want to send the OTP.
```javascript
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"Enter your Gmail id",
        pass:"Password of your gmail id"
        }
});
```
3. configure the Database File in /utils/database.js  according to your System.
4. Install all the Necessary packagaes using 
```javascript
npm install
```
5. After the running the code Go to the Route 
```javascript
localhost:3000/send
...

Enter your Email Id on Form in which You want to Recieve The OTP
