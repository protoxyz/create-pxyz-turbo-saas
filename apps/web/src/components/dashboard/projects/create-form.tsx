"use client";

import { useRouter } from "next/navigation";
import { createProjectSchema } from "@acme/api/src/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import { api, RouterOutputs } from "@/lib/api";
import { urls } from "@/lib/urls";
import { LoadingButton } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export function CreateProjectForm({
  onSuccess,
}: {
  onSuccess?: (project: RouterOutputs["project"]["create"]) => void;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const createProjectMutation = api.project.create.useMutation({
    onSuccess: (project) => {
      toast({ title: "Created Project", duration: 500 });
      onSuccess?.(project);
      router.push(urls.dashboard.projects.view(project.id));
    },
  });

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      // photos: [],
    },
  });

  function onSubmit(values: z.infer<typeof createProjectSchema>) {
    createProjectMutation.mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="My Project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="w-full"
          loading={createProjectMutation.isLoading}
          disabled={createProjectMutation.isLoading}
        >
          Create Project
        </LoadingButton>
      </form>
    </Form>
  );
}
