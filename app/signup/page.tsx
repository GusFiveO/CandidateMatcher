"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast, Toaster } from "sonner";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const promise = authClient.getSession();
  console.log(promise.then((data) => console.log(data)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        name,
        password,
        callbackURL: "/",
      });
      console.log(error);
      if (error) {
        throw new Error(error.message || "An error occurred during sign up");
      }

      toast("Sign up successful!");
    } catch (err) {
      toast(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
            <Button type="submit" className="w-full mb-2">
              Sign Up
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm">
              Already signed up?{" "}
              <Link href="/login" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default SignUpPage;
