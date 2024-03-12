import { GetServerSideProps, NextPage } from 'next';

interface Task {
  title: string;
  image: string;
}

interface Details {
  task: Task;
}

const TaskDetails: NextPage<Details> = ({ task }) => {
  return (
    <div className='bg-gradient-to-r from-blue-300 via-purple-300 to-red-300 w-screen h-screen'>
      <h1 className="text-xl font-bold mb-4 text-center">{task.title}</h1>
      <img src={task.image} alt={task.title} className="max-w-md mx-auto"/>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  
  try {
    const res = await fetch(`https://dev-api.almashhad.tv/api/videos/detailsElastic/${id}`);
    if (!res.ok) {
      throw new Error('Failed to get details');
    }
    const { data } = await res.json();

    const taskData = {
      title: data.result.title || "No image on this page",
      image: data.result.image || "https://via.placeholder.com/150"
    };

    return {
      props: {
        task: taskData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default TaskDetails;
