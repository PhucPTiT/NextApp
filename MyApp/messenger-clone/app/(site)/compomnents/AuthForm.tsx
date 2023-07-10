'use client';

import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

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
            // Aioxs Register
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
                        <Button>{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
