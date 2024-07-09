import * as OTPAuth from "otpauth";

export const generateOtp = (email = "") => {
  console.log(email, process.env.OTP_SECRET);
  let otp = new OTPAuth.TOTP({
    issuer: "knock2-project",
    label: email,
    algorithm: "SHA1",
    // 長度
    digits: 6,
    // 時效 分鐘
    period: 10,
    secret: OTPAuth.Secret.fromLatin1(email + process.env.OTP_SECRET),
  });
  return otp.generate();
};
