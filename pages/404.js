import MainLayout from '../components/ui/MainLayout';
import TextButton from '../components/buttons/TextButton';

function NotFound() {
  return (
    <MainLayout>
      <div className='flex flex-col items-center justify-center h-[50vh]'>
        <p className='text-9xl'>404</p>
        <p className='text-3xl'>Page Not Found</p>
        <div className='mt-2'>
          <TextButton link='/' className='mt-5' text={"Go Home"} />
        </div>
      </div>
    </MainLayout>
  );
}

export default NotFound;