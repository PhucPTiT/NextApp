'use client';

import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub, BsGoogle} from 'react-icons/bs'
import axios from 'axios';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            axios.post('api/register', data)
        } else {
            // Login
        }
    };

    const socialAction = (aciton: string) => {
        setIsLoading(true);
        // Next Auth Sign in
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                className="
                    bg-white
                    px-4
                    py-8
                    shadow
                    sm:rounded-lg
                    sm:px-10
                "
            >
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input id="name" label="Name" register={register} errors={errors} required />
                    )}
                    <Input id="email" label="Email" register={register} errors={errors} required />
                    <Input id="password" label="Password" register={register} errors={errors} required />
                    <div>
                        <Button disabled= {isLoading} fullWidth type = "submit">{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
                    </div>
                </form>
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='
                            absolute
                            inset-0
                            flex
                            items-center
                        '>
                            <div className='w-full border-gray-300 border-t'/>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='bg-white px-2 text-gray-500'>
                                Or continue width
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton 
                            icon = {BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton 
                            icon = {BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                    <div className='
                        flex
                        justify-center
                        gap-2
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    '>
                        <div>
                            {variant === 'LOGIN' ? 'New to Messenger ?' : 'Already account'}
                        </div>
                        <div onClick={toggleVariant} className='underline cursor-pointer'>
                            {variant === "LOGIN" ? "Creat an account" : "Login"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
