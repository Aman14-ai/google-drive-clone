'use client'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { FiMail, FiUser, FiLoader } from "react-icons/fi";
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createAccount, signInUser } from '@/lib/actions/user.action';
import OTPModal from './OTPModal';
import { toast } from 'sonner';



type Props = {
  type: "sign-in" | "sign-up"; // string;
}

const AuthForm = ({ type }: Props) => {

  const formSchema = z.object({
    fullName: type === "sign-up"
      ? z.string().min(3, { message: "Username must be at least 3 characters long" }).max(30)
      : z.string().optional(),
    email: z.string().min(1, { message: "Email is required" }).email()
  });

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accountId, setAccountId] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const user = type === 'sign-up' ?(await createAccount({
        fullName: values.fullName || '',
        email: values.email
      })) : (await signInUser({email:values.email}))


      console.log("User created successfully, : ", user)
      setAccountId(user.accountId)

    }
    catch (error) {
      console.log("Error in frontend while submitting auth Form , ", error)
      setErrorMessage("Something went wrong. Please try again later.")
      toast.error("Something went wrong. Please try again later.")
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-8 auth-form bg-white rounded-xl shadow-lg max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Title */}
          <motion.h1
            className="text-3xl font-bold text-center mb-6 text-gray-800"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {type === "sign-in" ? "Welcome Back!" : "Create Account"}
            <motion.div
              className="h-1 w-12 bg-[#fbbc04] mx-auto mt-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.4 }}
            />
          </motion.h1>

          {/* Decorative SVG (Animated) */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <svg width="120" height="40" viewBox="0 0 120 40">
              <motion.path
                d="M10,20 Q60,0 110,20"
                stroke="#fbbc04"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </svg>
          </motion.div>

          {/* Form Fields with Icons */}
          {type === "sign-up" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="pl-10 py-5 rounded-lg border-gray-300 focus:border-[#fbbc04] focus:ring-1 focus:ring-[#fbbc04]"
                      />
                    </div>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
            </motion.div>
          )
          }

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: type === "sign-up" ? 0.4 : 0.3 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="your@email.com"
                      {...field}
                      className="pl-10 py-5 rounded-lg border-gray-300 focus:border-[#fbbc04] focus:ring-1 focus:ring-[#fbbc04]"
                    />
                  </div>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Submit Button with Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type="submit"
              className="w-full cursor-pointer py-6 rounded-lg bg-[#fbbc04] hover:bg-[#e6ac00] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.span
                  className="flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <FiLoader className="mr-2" />
                  Processing...
                </motion.span>
              ) : (
                type === "sign-in" ? "Sign In" : "Sign Up"
              )}
            </Button>
          </motion.div>

          {/* Error Message with Shake Animation */}
          {errorMessage && (
            <motion.p
              className="text-red-500 text-sm text-center py-2 px-4 bg-red-50 rounded-md"
              initial={{ x: 0 }}
              animate={{
                x: [-5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
            >
              {errorMessage}
            </motion.p>
          )}

          {/* Switch Auth Type */}
          <motion.div
            className="text-center text-gray-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-[#fbbc04] hover:underline"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </motion.div>

          {/* Decorative Bottom SVG */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <svg width="100%" height="20" viewBox="0 0 120 20">
              <motion.path
                d="M0,10 C30,30 90,-10 120,10"
                stroke="#fbbc04"
                strokeWidth="2"
                fill="none"
                strokeDasharray="0"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
            </svg>
          </motion.div>
        </motion.form>
      </Form>
      {/* otp verification */}
      {
        accountId && <OTPModal email={form.getValues("email")} accountId={accountId} />
      }
    </>
  )
}

export default AuthForm