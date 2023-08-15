import { connection } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exit" },
        { status: 400 }
      );
    }
    console.log('User exists');

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Password invalid' },
        { status: 400 }
      );
    }
    console.log(user);

    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      userName : user.userName
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Login Successfully!',
      success: true,
    });

    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error occured : ${err.message}` },
      { status: 500 }
    );
  }
}
