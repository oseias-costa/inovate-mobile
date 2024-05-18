import { Stack, Link, Redirect } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
    <Redirect href="/dashboard/" />
      {/* <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link>
        <Link href={{ pathname: '/auth/welcome', params: { name: 'Dan' } }} asChild>
          <Button title="Inicio" />
        </Link>
        <Link href={{ pathname: '/auth/selectionType', params: { name: 'Dan' } }} asChild>
          <Button title="Selecionar" />
        </Link>
        <Link href={{ pathname: '/auth/animation', params: { name: 'Dan' } }} asChild>
          <Button title="Animation" />
        </Link>
        <Link href={{ pathname: '/dashboard/', params: { name: 'Dan' } }} asChild>
          <Button title="dashboard" />
        </Link>
      </Container> */}
    </>
  );
}
