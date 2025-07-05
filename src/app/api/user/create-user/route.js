import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import { UserModel1, UserModel2 } from "../../../../../models/userModel";

export async function POST(req) {
  try {
    await connectDb();
    await connectDb2
    const body = await req.json();
    const { firstname, email, mobile, password, role = 'user' } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    await authMiddleware(token);
    const user = new UserModel1({ firstname, email, mobile, password, role });
    const user1 = new UserModel2({ firstname, email, mobile, password, role });
    await user.save();
    await user1.save();

    return Response.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
