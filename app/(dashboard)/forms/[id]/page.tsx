

import { GetFormById } from '@/actions/form';
import Designer from '@/components/Designer';
import FormBuilder from '@/components/FormBuilder';
import { FormLinkShare } from '@/components/FormLinkShare';
import PreviewDialogBtn from '@/components/PreviewDialogBtn';
import PublishFormBtn from '@/components/PublishFormBtn';
import SaveFormBtn from '@/components/SaveFormBtn';
import { VisitBtn } from '@/components/VisitBtn';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DndContext } from '@dnd-kit/core';
import React, { ReactNode } from 'react'
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';

async function PageBuilder({ params }: { params: { id: string } }) {

    const form = await GetFormById(Number(params.id));
    if (!form) {
        throw new Error("Form not found!");
    }
  const { visits, submissions } = form;
  
  let submissionRate = 0;
 
  if (visits > 0) {
    submissionRate = (submissionRate / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

   const cardStyle = 'shadow-sm  hover:shadow-md duration-300';
  
  return (
    <>
      <div className='py-10 border-t border-b border-muted'>
        <div className='flex justify-between  container'>
          <h1 className=' truncate text-4xl font-bold'>{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
       <div className='py-4 border-b border-muted'>
          <div className='container flex gap-2  items-center justify-between'>
            <FormLinkShare shareUrl={form.shareURL} />
          </div>
      </div>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
    <StatsCard
      title="Total visits"
      value={visits.toLocaleString() || ""}
      icon={<LuView className={'  scale-125 text-blue-600'} />}
      helper="All time form visits"
      loading={false}
      className={cardStyle}
    />
    <StatsCard
      title="Total submissions"
      value={submissions.toLocaleString()}
      icon={<FaWpforms className={' scale-125 text-yellow-600'} />}
      helper="All time form submissions"
      loading={false}
     className={cardStyle}
    />
    <StatsCard
      title="Submission rate"
      value={submissionRate + "%" || ""}
      icon={<HiCursorClick className={'  scale-125 text-green-600'} />}
      helper="Visits that result in form submission"
      loading={false}
       className={cardStyle}
    />
    <StatsCard
      title="Bounce rate"
      value={bounceRate + "%" || ""}
      icon={<TbArrowBounce className={' scale-125  text-red-600'} />}
      helper="Visits that leaves without interacting"
      loading={false}
      className={cardStyle}
    />
  </div>
    </>
  )
}

function StatsCard({
  title,
  value,
  icon,
  helper,
  loading,
  className
}: {
    title: string,
    value: string,
    icon: ReactNode,
    helper: string,
    loading: boolean,
    className:string
}) {
  return <Card className={className}>
    <CardHeader className='flex flex-row items-center justify-between pb-2'>
         <CardTitle className='text-sm font-medium text-muted-foreground'>
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {
          loading && <Skeleton>
            <span className=' opacity-0'>0</span>
          </Skeleton>
        }
        {
          !loading && value
        }
      </div>
      <p className=' text-xs text-muted-foreground pt-1'>{helper}</p>
    </CardContent>
  </Card>
}

export default PageBuilder