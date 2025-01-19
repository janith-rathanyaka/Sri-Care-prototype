import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Otp } from '@app/shared/schemas/otp.schema';
import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class OtpGenerateService {
  constructor(
    @Inject('OtpRepository')
    private readonly otpRepository: MongoRepository<Otp>,
  ) {}
  async generateOtp(normalizeMobileNumber: string): Promise<string> {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set expiration time (e.g., 5 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    await this.otpRepository.create({
      mobile: normalizeMobileNumber,
      otp,
      expiresAt: expiresAt.getTime(),
    });

    return otp;
  }

  async verifyOtp(mobile: string, otp: string): Promise<boolean> {
    const otpRecord = await this.otpRepository.findOne({ mobile, otp });

    if (!otpRecord) {
      return false; // OTP not found
    }

    if (otpRecord.isVerified) {
      return false; // OTP already used
    }

    if (otpRecord.expiresAt < new Date().getTime()) {
      return false; // OTP expired
    }

    // Mark OTP as verified
    otpRecord.isVerified = true;
    await this.otpRepository.update(otpRecord._id.toString(), {
      isVerified: true,
    });

    return true;
  }
}
