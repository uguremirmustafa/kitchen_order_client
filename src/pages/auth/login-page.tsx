import { useAuth } from 'components/wrappers/auth-wrapper';
import { LoginParams } from 'lib/api/auth.api';
import { SubmitHandler, useForm } from 'react-hook-form';

function LoginPage(): JSX.Element {
  const { signin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginParams>({
    defaultValues: { email: 'uguremirmustafa2@gmail.com', password: 'ugur123' },
    mode: 'all',
  });

  const onSubmit: SubmitHandler<LoginParams> = (data) => {
    signin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full items-center">
      <h2 className="text-xl font-black underline">Login</h2>
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
      <button disabled={!isValid} type="submit" className="btn max-w-xs btn-secondary w-full">
        login
      </button>
    </form>
  );
}

export default LoginPage;
