import TextFormField from '@components/text-form-field/TextFormField';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import { FiScissors } from 'react-icons/fi';
import { IoCopyOutline, IoOpenOutline } from 'react-icons/io5';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
	longUrl: yup
		.string()
		.matches(
			/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
			'Long URL field must be a valid URL!'
		)
		.required(`Long URL field mustn't be empty!`),
});

export default function HomePage() {
	const [longUrl, setLongUrl] = useState<string>('');
	const [shortUrl, setShortUrl] = useState<string>('');
	const [copied, setCopied] = useState(false);

	const submitForm = async (
		data: { longUrl: string },
		resetForm: () => void
	) => {
		setLongUrl(data.longUrl);
		await axios
			.post('/api/create', {
				longUrl: data.longUrl,
			})
			.then((res) => {
				setShortUrl(
					`${process.env.NEXT_PUBLIC_SHORT_URL}/${res.data.shortUrl}`
				);
			})
			.catch((res) => {
				console.log(res);
			})
			.finally(() => {
				resetForm();
			});
	};

	return (
		<>
			<Head>
				<title>URL Shortener</title>
				<meta
					name="description"
					content="Easy and useful url shortener"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<div className="flex min-h-screen items-center justify-center bg-primaryDotted bg-primaryDottedSize px-4">
				<motion.main
					className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl border border-[#33323E] bg-secondary px-6 py-8"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ ease: 'easeOut', duration: 0.15 }}
				>
					<h1 className="text-4xl font-semibold text-white">
						URL Shortener
					</h1>
					{!shortUrl ? (
						<Formik
							initialValues={{ longUrl: '' }}
							onSubmit={(data, { setSubmitting, resetForm }) => {
								setSubmitting(true);
								submitForm(data, resetForm);
							}}
							validationSchema={validationSchema}
						>
							{({ isSubmitting, handleSubmit }) => (
								<Form
									className="flex w-full flex-col gap-4"
									onSubmit={handleSubmit}
								>
									<Field
										label="Long URL"
										name="longUrl"
										type="text"
										placeholder="Enter the long url here"
										component={TextFormField}
									/>
									<button
										className="flex items-center justify-center gap-2 rounded-md bg-accent py-2 px-5 font-medium text-white transition-all hover:bg-accent-brighter active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
										type="submit"
										disabled={isSubmitting}
									>
										{!isSubmitting ? (
											<>
												Shorten{' '}
												<FiScissors className="h-4 w-4" />
											</>
										) : (
											<>
												Shorting{' '}
												<FiScissors className="h-4 w-4 animate-spin" />
											</>
										)}
									</button>
								</Form>
							)}
						</Formik>
					) : (
						<div className="flex w-full flex-col gap-6">
							<header className="flex flex-col gap-2">
								<label
									className="text-sm font-medium text-[#A1A0AB]"
									htmlFor="shortUrl"
								>
									Short URL
								</label>
								<div className="flex items-center justify-between gap-1 border border-[#211F2D] bg-primary py-2 px-3 text-[#abb2bf] outline-none">
									<input
										className="w-full border-none bg-transparent outline-none"
										type="text"
										value={shortUrl}
										id="shortUrl"
										readOnly
									/>
									<div className="flex items-center justify-center gap-2">
										<a
											className="rounded-lg p-1.5 transition-all hover:bg-[#353441] active:scale-95"
											href={shortUrl}
											title="View URL"
											target="_blank"
											rel="noreferrer"
										>
											<IoOpenOutline className="h-5 w-5" />
										</a>
										{!copied ? (
											<button
												className="rounded-lg p-1.5 transition-all hover:bg-[#353441] active:scale-95"
												title="Copy URL"
												onClick={() => {
													navigator.clipboard.writeText(
														shortUrl
													);
													setCopied(true);
													setTimeout(() => {
														setCopied(false);
													}, 1500);
												}}
											>
												<IoCopyOutline className="h-5 w-5" />
											</button>
										) : (
											<p className="text-medium text-sm text-white">
												Copied!
											</p>
										)}
									</div>
								</div>
							</header>
							<footer className="flex flex-col gap-1">
								<p className="text-[#A1A0AB]">
									Long URL:{' '}
									<a
										className="font-medium text-white hover:underline"
										href={longUrl}
									>
										{longUrl}
									</a>
								</p>
								<p className="text-[#A1A0AB]">
									I want{' '}
									<button
										className="font-medium text-white hover:underline"
										onClick={() => {
											setLongUrl('');
											setShortUrl('');
										}}
									>
										shorten more
									</button>
								</p>
							</footer>
						</div>
					)}
				</motion.main>
			</div>
		</>
	);
}
