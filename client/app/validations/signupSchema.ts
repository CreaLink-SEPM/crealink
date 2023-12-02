import vine from '@vinejs/vine';

export const signupSchema = vine.object({
  username: vine.string().minLength(2).maxLength(32),
  name: vine.string().minLength(2).maxLength(32),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(32).confirmed(),
});
