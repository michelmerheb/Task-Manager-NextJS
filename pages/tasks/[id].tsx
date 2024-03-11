import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await fetch(`https://dev-api.almashhad.tv/api/videos/detailsElastic/${context.params?.id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch task details');
    }
    const apiData = await res.json();

    const taskData = {
      title: apiData.title || "Default Title", 
      image: apiData.image || "https://via.placeholder.com/150"
    };

    return {
      props: {
        task: taskData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
