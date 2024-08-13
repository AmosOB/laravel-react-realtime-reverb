import React, { useState } from 'react'
import Navbar from '../Navbar'
import api from '../apis'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pasword: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/register', formData)
        .then((res) => {
            const token = res.data.access_token;
            localStorage.setItem('token', token);
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        })
    }
  return (
    <>
        <Navbar />
        <section className="bg-gray-50 dark:bg-gray-900 mt-14">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={ handleSubmit } className="space-y-4 md:space-y-6">
                        <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm
                                    font-medium text-gray-900
                                    dark:text-white">
                                        Your name
                                    </label>
                                <input
                                    type="name"
                                    name="name"
                                    value={ formData.name }
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    id="name"
                                    className="bg-gray-50 border border-gray-300
                                    text-gray-900 rounded-lg
                                    focus:ring-primary-600 focus:border-primary-600
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    placeholder="Name ..."
                                    required=""/>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm
                                    font-medium text-gray-900
                                    dark:text-white">
                                        Your email
                                    </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={ formData.email || "" }
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    id="email"
                                    className="bg-gray-50 border border-gray-300
                                    text-gray-900 rounded-lg
                                    focus:ring-primary-600 focus:border-primary-600
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""/>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm
                                    font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={ formData.pasword || "" }
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900
                                    rounded-lg focus:ring-primary-600
                                    focus:border-primary-600 block
                                    w-full p-2.5 dark:bg-gray-700
                                    dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    required=""/>
                            </div>
                            <div
                                className="flex items-center justify-between">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600
                                    hover:underline dark:text-primary-500">
                                        Forgot password?
                                </a>
                            </div>
                            <button type="submit"
                                className="w-full text-white bg-sky-800 hover:bg-primary-700
                                focus:ring-4 focus:outline-none focus:ring-primary-300
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                dark:bg-primary-600 dark:hover:bg-primary-700
                                dark:focus:ring-primary-800">
                                    Sign in
                                </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already Registered ?
                                <Link
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                to={'/login'}>
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Register
