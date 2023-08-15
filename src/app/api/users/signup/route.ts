import { connection } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

connection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;
    console.log(reqBody, 'line 12');

    // checking if the user is already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Encrypting the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Creating a new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    // if (savedUser)
    return NextResponse.json(
      { message: 'User created successfully!', success: true, savedUser },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error occured : ${err.message}` },
      { status: 500 }
    );
  }
}
