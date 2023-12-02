import { CustomErrorReporter } from '@/app/validations/CustomErrorReporter';
import { signupSchema } from '@/app/validations/signupSchema';
import vine, { errors } from '@vinejs/vine';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    vine.errorReporter = () => new CustomErrorReporter();

    const validator = vine.compile(signupSchema);
    const payload = await validator.validate(data);

    return NextResponse.json({ status: 200, data: payload });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, error: error.message });
    }
  }
}
