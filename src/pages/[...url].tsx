import redis from '@utils/redis';
import { GetServerSideProps } from 'next';
import type { FC, ReactNode } from 'react';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const shortened = context.params.url;

	let response = await redis.hget('links', shortened);

	if (!response || response == null) {
		return {
			redirect: {
				destination: 'https://us.nilkoush.dev',
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
