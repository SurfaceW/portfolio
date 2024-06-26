import { Mdx } from '@/components/mdx';
import { PostListServer } from '@/components/posts/post-list';

export default function RootPage() {
  return (
    <>
      <article className='prose prose-slate dark:prose-invert mb-8'>
        <h4 className='text-lg'>This is <strong>Arno</strong>.</h4>
        <br className='inline-block p-4' />
        <ul>
          <li>A software engineer currently working at <a className="hover:to-blue-600 from-blue-300 transition-all text-blue-600" href="https://www.dingtalk.com/" target='_blank'>DingTalk</a> of Alibaba Inc.</li>
          <li>A designer of digital systems.</li>
          <li>A person try to be more creative during life time.</li>
        </ul>
      </article>
      <br style={{ height: '.5px' }} />
      <PostListServer listOnly params={{
        lang: 'en'
      }} />
    </>
  );
};
