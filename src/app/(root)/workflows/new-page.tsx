"use client";

import { ActionBar } from "@/components/action-bar/action-bar";
import { Button } from "@/components/buttons/Button";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Main from "./_components/main";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";
import {
  allWorkflows,
  createWorkflow,
} from "@/server/workflowActions/workflow";
export const NewPageWorkflows = () => {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "all-workflows",
  });
  const queryClient = useQueryClient();
  const { data, status } = useQuery({
    queryKey: ["fetch-all-workflows", activeTab],
    queryFn: () => allWorkflows(),
  });

  const mutation = useMutation({
    mutationFn: () => createWorkflow(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-all-workflows", activeTab],
      });
      toast.success("Created new workflow !");
    },
    onError: () => {
      toast.error("Failed to create new workflow !");
    },
  });

  const handleNewWorkflow = () => {
    mutation.mutate();
  };

  return (
    <section className="w-full h-fit relative  overflow-y-auto hide-scrollbar">
      <Tabs
        value={activeTab}
        onValueChange={(tab) => {
          setActiveTab(tab);
        }}
        defaultValue="all-workflows"
        className="w-full"
      >
        <ActionBar>
          <Select
            value={activeTab}
            onValueChange={(tab) => {
              setActiveTab(tab);
            }}
            defaultValue="all-workflows"
          >
            <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] rounded-md">
              <SelectValue placeholder="Workflows" />
            </SelectTrigger>

            <SelectContent className="font-gilroyMedium">
              <SelectItem
                value="all-workflows"
                className="w-full py-2.5 rounded-lg"
              >
                All Workflows
              </SelectItem>
              <SelectItem
                value="draft-workflows"
                className="w-full py-2.5 rounded-lg"
              >
                Draft Workflows
              </SelectItem>
              <SelectItem
                value="active-workflows"
                className="w-full py-2.5 rounded-lg"
              >
                Active Workflows
              </SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Button
              disabled={mutation?.isPending}
              variant="primary"
              type="button"
              onClick={handleNewWorkflow}
            >
              Create Workflow
            </Button>
          </div>
        </ActionBar>

        <TabsContent value="all-workflows">
          <Main data={data?.data ?? []} status={status === "pending"} />
        </TabsContent>
        <TabsContent value="draft-workflows">
          <Main
            data={data?.data?.filter((wf) => wf.status === "draft")}
            status={status === "pending"}
          />
        </TabsContent>
        <TabsContent value="active-workflows">
          <Main
            data={data?.data?.filter((wf) => wf.status === "published")}
            status={status === "pending"}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};
