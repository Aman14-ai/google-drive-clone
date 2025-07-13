'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { sendEmailOTP, verifySecret } from '@/lib/actions/user.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const OTPModal = ({ email, accountId }: { email: string, accountId: string }) => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [resend, setResend] = useState(false);

    const handleVerifyOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!email || !accountId) {
                toast.error("Email or Account ID is missing.");
                return;
            }
            const sessionId = await verifySecret({ accountId, password });
            if (sessionId) {
                //console.log("Session ID from verifySecret in frontend: ", sessionId);
                console.log("OTP verified successfully, : ");
                toast.success("OTP verified successfully.");
                router.push('/'); // Redirect to home page on successful verification
            }
        }
        catch (error) {
            toast.error("Something went wrong. Please try again later.");
            console.log("Error in OTP verification while handling verify otp in catch block : ", error);
        }
        finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    }
    const handleResendOTP = async () => {

        try {

            await sendEmailOTP({ email });
            console.log("OTP resent successfully");
            toast.success(" OTP sent to your email successfully.");


            setResend(true);
        } catch (error) {
            console.log("Error in resending OTP in frontend in catch block: ", error);
        }

    }


    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Verify Your OTP</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please check your email <span className='text-brand'>{email}</span> for OTP.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <InputOTP maxLength={6} value={password} onChange={setPassword}>
                    <InputOTPGroup className='shad-otp'>
                        <InputOTPSlot className='shad-otp-slot' index={0} />
                        <InputOTPSlot className='shad-otp-slot' index={1} />
                        <InputOTPSlot className='shad-otp-slot' index={2} />
                        <InputOTPSlot className='shad-otp-slot' index={3} />
                        <InputOTPSlot className='shad-otp-slot' index={4} />
                        <InputOTPSlot className='shad-otp-slot' index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <AlertDialogFooter>
                    <div className='flex items-center w-full justify-between'>
                        <div className='subtitle-2 mt-2 text-light-100 '>
                            {
                                resend ?
                                    (
                                        <div>
                                            OTP resent successfully to <span className="text-brand">{email}</span>
                                            <br />
                                            <Button onClick={handleResendOTP} type='button' variant={'link'} className=' -ml-4 -mt-2 text-[#0085ff] '>
                                                Click to Resend again
                                            </Button>
                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                            Didn't receive OTP?
                                            <Button onClick={handleResendOTP} type='button' variant={'link'} className='pl-1 text-brand cursor-pointer '>
                                                Click to Resend
                                            </Button>
                                        </>
                                    )
                            }

                        </div>
                        <div className='flex items-center gap-2'>
                            
                            <AlertDialogAction disabled={isLoading} onClick={handleVerifyOTP} className='bg-brand hover:bg-brand-100 cursor-pointer'>
                                {
                                    isLoading ? <>Verifying...<Loader2 className='animate-spin' /></> : 'Verify OTP'
                                }

                            </AlertDialogAction>
                        </div>

                    </div>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default OTPModal
