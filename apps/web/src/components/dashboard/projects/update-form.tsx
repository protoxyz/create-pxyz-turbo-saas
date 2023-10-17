"use client";

import { useRouter } from "next/navigation";
import { updateProjectSchema } from "@acme/api/src/schemas/project";
import { Project } from "@acme/db/types";
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

export function UpdateProjectForm({
  project,
  onSuccess,
}: {
  project: Project;
  onSuccess?: (project: RouterOutputs["project"]["update"]) => void;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const ctx = api.useContext();
  const updateProjectMutation = api.project.update.useMutation({
    onSuccess: (project) => {
      toast({ title: "Saved", duration: 500 });
      onSuccess?.(project);
      ctx.project.invalidate();
      router.push(urls.dashboard.projects.view(project.id));
    },
  });

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      id: project?.id,
      name: project?.name ?? "",
      description: project?.description ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof updateProjectSchema>) {
    updateProjectMutation.mutateAsync(values);
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
                <Input {...field} />
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
          loading={updateProjectMutation.isLoading}
          disabled={updateProjectMutation.isLoading}
        >
          Save
        </LoadingButton>
      </form>
    </Form>
  );
}
