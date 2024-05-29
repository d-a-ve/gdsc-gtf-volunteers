import { FormEvent, useRef, useState } from "react";

import { createVolunteerRecord } from "@/appwrite/utils/database";
import { createFile } from "@/appwrite/utils/storage";
import { Button } from "@/components/Button";
import { InlinePaddingContainer, MaxContainer } from "@/components/Container";
import { Input } from "@/components/Input";
import { Logo } from "@/components/Logo";
import { LOCAL_STORAGE_KEYS } from "@/enums";
import { addLocalStorage, readLocalStorage } from "@/lib/localStorage";
import { isToday } from "@/lib/utils";
import { DefaultError, useMutation } from "@tanstack/react-query";

export function Home() {
  const [errors, setErrors] = useState({
    name: "",
    file: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasNameError = errors.name.length > 0;
  const hasFileError = errors.file.length > 0;
  const [date] = useState(() => readLocalStorage(LOCAL_STORAGE_KEYS.DATE));
  const isTodayDate = date && isToday(new Date(date));
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: submitCreateForm, isPending } = useMutation<
    void,
    DefaultError,
    { name: string; file: File }
  >({
    mutationFn: async ({ name, file }) => {
      const fileRes = await createFile(file);
      await createVolunteerRecord({ name, imgId: fileRes.$id });
    },
    onSuccess: () => {
      addLocalStorage(LOCAL_STORAGE_KEYS.DATE, new Date().toISOString());
      formRef.current?.reset();
      setHasSubmitted(true);
    },
    onError: () => {
      alert(
        "Somethig happened when submitting the form, please try again later!!"
      );
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name") as string,
      file: formData.get("picture") as File,
    };

    if (data.name.length < 1) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }

    if (data.file.size < 1) {
      setErrors((prev) => ({ ...prev, file: "File is required" }));
      return;
    }

    if (data.file.size > 1024 * 1024 * 5) {
      setErrors((prev) => ({
        ...prev,
        file: "File size should be less than 5MB",
      }));
      return;
    }

    submitCreateForm({
      name: formData.get("name") as string,
      file: formData.get("picture") as File,
    });
  };

  return (
    <MaxContainer>
      <InlinePaddingContainer>
        <header className="py-6">
          <div className="w-16">
            <Logo />
          </div>
        </header>
        <main className="py-8">
          {hasSubmitted || isTodayDate ? (
            <section className="space-y-2 max-w-lg mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight text-green-900">
                You have submitted today&apos;s task
              </h1>
              <p>
                Thank you for submitting today&apos;s task. Please check back
                tomorrow!
              </p>
            </section>
          ) : (
            <section className="space-y-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight text-green-900">
                Submit your picture of task
              </h1>
              <div className="max-w-lg mx-auto">
                <form
                  className="space-y-6"
                  onSubmit={submitHandler}
                  ref={formRef}
                >
                  <div className="space-y-2">
                    <label className="text-lg font-medium" htmlFor="name">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeHolder="Enter your name"
                      inputSize="md"
                      className={hasNameError ? "border-red-500" : ""}
                      onChange={(e) => {
                        if (hasNameError && e.target.value.length > 0) {
                          setErrors((prev) => ({ ...prev, name: "" }));
                        }
                      }}
                    />
                    {hasNameError && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg font-medium" htmlFor="picture">
                      Picture
                    </label>
                    <Input
                      type="file"
                      id="picture"
                      name="picture"
                      inputSize="md"
                      className={hasFileError ? "border-red-500" : ""}
                      onChange={(e) => {
                        const files =
                          e.currentTarget.files && e.currentTarget.files[0];
                        if (
                          hasFileError &&
                          !!files &&
                          files.size < 1024 * 1024 * 5
                        ) {
                          setErrors((prev) => ({ ...prev, file: "" }));
                        }
                      }}
                    />
                    {hasFileError && (
                      <p className="text-sm text-red-500">{errors.file}</p>
                    )}
                  </div>
                  <div className="pt-4">
                    <Button
                      isLoading={isPending}
                      size="lg"
                      className="hover:text-green-500 focus-visible:text-green-500 text-white w-full"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          )}
        </main>
      </InlinePaddingContainer>
    </MaxContainer>
  );
}
