import { LoginParams, register as authRegister } from 'lib/api/auth.api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginParams>({
    defaultValues: { email: 'uguremirmustafa2@gmail.com', password: 'ugur123' },
    mode: 'all',
  });

  const onSubmit = async (data: LoginParams) => {
    const result = await authRegister(data);
    if (result) {
      navigate('/auth/login');
    } else {
      console.error('registeration is not successfull');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full items-center">
      <h2 className="text-xl font-black underline">Register</h2>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="email"
          className="input input-bordered w-full max-w-xs"
          {...register('email', { required: true })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          className="input input-bordered w-full max-w-xs"
          {...register('password', { required: true, maxLength: 10, minLength: 3 })}
        />
        {errors.password && <span className="label-text-alt">{errors.password.message}</span>}
      </div>
      <button disabled={!isValid} type="submit" className="btn max-w-xs btn-primary w-full">
        register
      </button>
    </form>
  );
}

export default RegisterPage;
