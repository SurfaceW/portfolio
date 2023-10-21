import { Mdx } from '@/components/mdx';

export default function RootPage() {
  return (
    <div>
      <h4 className='text-lg'>This is <strong>Arno</strong>.</h4>
      <br className='inline-block p-4' />
      <ul>
        <li>A software engineer currently working at <a className="hover:to-blue-600 from-blue-300 transition-all text-blue-600" href="https://www.dingtalk.com/">DingTalk</a> of Alibaba Inc.</li>
        <li>A designer of digital systems.</li>
        <li>A person try to be more creative during life time.</li>
      </ul>
    </div>
  );
};
