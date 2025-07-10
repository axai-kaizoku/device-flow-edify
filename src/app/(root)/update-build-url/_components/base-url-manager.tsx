"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBaseUrl } from "@/contexts/base-url-context";
import { CheckCircle, RotateCcw, Settings } from "lucide-react";

export function BaseUrlManager() {
  const {
    baseUrl,
    environment,
    customUrl,
    setEnvironment,
    setCustomUrl,
    resetToStaging,
  } = useBaseUrl();

  const [tempCustomUrl, setTempCustomUrl] = useState(customUrl);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (environment === "custom") {
      setCustomUrl(tempCustomUrl);
    }
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  const handleReset = () => {
    resetToStaging();
    setTempCustomUrl("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  const handleEnvironmentChange = (value: string) => {
    setEnvironment(value as "prod" | "staging" | "custom");
    if (value !== "custom") {
      setTempCustomUrl("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          API Base URL Configuration
        </CardTitle>
        <CardDescription>
          Select the environment for API calls. Changes will apply throughout
          the entire application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Base URL Display */}
        <div className="p-4 bg-muted rounded-lg">
          <Label className="text-sm font-medium text-muted-foreground">
            Current Base URL:
          </Label>
          <p className="font-mono text-sm mt-1 break-all">
            {baseUrl || "Not set"}
          </p>
        </div>

        {/* Environment Selection */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Select Environment:</Label>
          <RadioGroup
            value={environment}
            onValueChange={handleEnvironmentChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prod" id="prod" />
              <Label htmlFor="prod" className="flex-1 cursor-pointer">
                <div>
                  <div className="font-medium">Production</div>
                  <div className="text-sm text-muted-foreground">
                    https://gcp-api.edify.club
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="staging" id="staging" />
              <Label htmlFor="staging" className="flex-1 cursor-pointer">
                <div>
                  <div className="font-medium">Staging</div>
                  <div className="text-sm text-muted-foreground">
                    https://staging.deviceflow.ai
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="flex-1 cursor-pointer">
                <div>
                  <div className="font-medium">Custom</div>
                  <div className="text-sm text-muted-foreground">
                    Enter your own URL
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Custom URL Input */}
        {environment === "custom" && (
          <div className="space-y-2">
            <Label htmlFor="custom-url">Custom Base URL:</Label>
            <Input
              id="custom-url"
              type="url"
              placeholder="https://your-custom-api.com"
              value={tempCustomUrl}
              onChange={(e) => setTempCustomUrl(e.target.value)}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={environment === "custom" && !tempCustomUrl.trim()}
          >
            {isSubmitted ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Applied!
              </>
            ) : (
              "Apply Changes"
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 bg-transparent"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Staging
          </Button>
        </div>

        {/* Status Message */}
        {isSubmitted && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ Base URL has been updated successfully! All API calls will now
              use: <br />
              <span className="font-mono">{baseUrl}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
