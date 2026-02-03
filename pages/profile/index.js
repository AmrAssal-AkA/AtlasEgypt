import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

function ProfilePage() {
  return (
    <main className='min-h-screen'>
      <div className='container mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold mb-4'>Profile Page</h1>
        </div>
    </main>
  )
}


export async function getServerSideProps(context){
  const session = await getServerSession(context.req, context.res, authOptions);

  if(!session){
    return{
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {props: {session: JSON.parse(JSON.stringify(session))}};
}

export default ProfilePage