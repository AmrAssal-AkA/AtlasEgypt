import { getSession } from 'next-auth/react'
import React from 'react'

function ProfilePage() {
  return (
    <div>ProfilePage</div>
  )
}


export async function getServerSideProps(context){
  const session = await getSession({req: context.req});

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