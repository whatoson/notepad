import { Button, Center, Stack, Text } from "@mantine/core";
import { Link, useRouteError } from "react-router";

export function ErrorPage() {
  const error = useRouteError();
  const message =
    error instanceof Error ? error.message : "Something went wrong";
  console.error(error);

  return (
    <Center h="100dvh">
      <Stack align="center">
        <Text size="lg">{message}</Text>
        <Button component={Link} to="/">
          Return
        </Button>
      </Stack>
    </Center>
  );
}
