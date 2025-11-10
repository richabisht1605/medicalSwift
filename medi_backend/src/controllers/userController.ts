import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { sendEmail } from "../utils/emailUtils";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      role,
      ambulanceName,
      ambulanceNumber,
      hasMedicalTraining,
      imageUrl,
      address,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      ambulanceName,
      ambulanceNumber,
      hasMedicalTraining,
      imageUrl,
      address,
    });

    await newUser.save();
    await sendEmail(
      email,
      "Registration Successful",
      `Hi ${fullName},\n\nWelcome to MediSwift! Your account has been created successfully.\n\nThank you for joining us!\n\n- MediSwift Team`
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
