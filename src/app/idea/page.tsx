import { UVCardElaborationStudio, UVCardPromptStudio } from "@/components/uv-card/uv-card";

export default function Page() {
  return (
    <>
      <h1>idea that sparks ~ ✨</h1>
      <div>
        <h2 className="mb-4 mt-4">My Projects</h2>
        <UVCardPromptStudio />
        <br />
        <UVCardElaborationStudio />
      </div>
    </>
  );
}
