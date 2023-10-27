import PostImageUpload from "@/components/image-upload";

export default async function ImageUploadServer({ searchParams }: {
  searchParams: {
    sk?: string;
  }
}) {
  // const allViews = await getViewsCount();

  return (
    <div>
      <PostImageUpload sk={searchParams?.sk || ''} />
    </div>
  );
}
