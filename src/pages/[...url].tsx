import redis from '@utils/redis';
import { GetServerSideProps } from 'next';
import type { FC, ReactNode } from 'react';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const shortUrl = context.params.url;

	let response = await redis.hget('links', shortUrl);

	if (!response || response == null) {
		return {
			redirect: {
				destination: process.env.NEXT_PUBLIC_SHORT_URL as string,
				permanent: true,
			},
		};
	}

	return {
		redirect: {
			destination: response,
			permanent: true,
		},
	};
};

interface LinkPageProps {
	children?: ReactNode;
}

const LinkPage: FC<LinkPageProps> = ({ children }) => {
	return <></>;
};

export default LinkPage;
