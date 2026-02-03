import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

function ProfilePage() {
  return (
    <div>ProfilePage</div>
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
  return {props: {session}};
}

export default ProfilePage