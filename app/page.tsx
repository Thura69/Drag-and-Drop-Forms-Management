import Image from 'next/image'
import Layout from './(dashboard)/layout'
import { GetFormStats, GetForms } from '@/actions/form'
import { LuView } from "react-icons/lu";
import { ReactNode, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from 'react-icons/fa';
export default async function Home() {
  return (
  <Layout>
    
    <div className='container p-4'>
        <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper/>
        </Suspense>
        <Separator className='my-6' />
        <h2 className=' text-4xl font-bold col-span-2'>Your forms</h2>
        <Separator className='my-6' />
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
         <CreateFormBtn />
          <Suspense
            fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el}/>
          ))}
          >
          <FormCards/>
         </Suspense>
        </div>
    </div>
  </Layout>
  )
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading:boolean
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  const cardStyle = 'shadow-sm  hover:shadow-md duration-300';

  return <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
    <StatsCard
      title="Total visits"
      value={data?.visits.toLocaleString() || ""}
      icon={<LuView className={'  scale-125 text-blue-600'} />}
      helper="All time form visits"
      loading={loading}
      className={cardStyle}
    />
    <StatsCard
      title="Total submissions"
      value={data?.submisions.toLocaleString() || ""}
      icon={<FaWpforms className={' scale-125 text-yellow-600'} />}
      helper="All time form submissions"
      loading={loading}
     className={cardStyle}
    />
    <StatsCard
      title="Submission rate"
      value={data?.submissionRate.toLocaleString() + "%" || ""}
      icon={<HiCursorClick className={'  scale-125 text-green-600'} />}
      helper="Visits that result in form submission"
      loading={loading}
       className={cardStyle}
    />
    <StatsCard
      title="Bounce rate"
      value={data?.visits.toLocaleString() + "%" || ""}
      icon={<TbArrowBounce className={' scale-125  text-red-600'} />}
      helper="Visits that leaves without interacting"
      loading={loading}
      className={cardStyle}
    />
  </div>
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

function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary/20 h-[190px] w-full'/>
}

async function FormCards() {
  const forms = await GetForms();

  return <>
    {
      forms.map(form => (
        <Formcard key={form.id} form={form} />
      ))
  }
  </>
}

function Formcard({form}:{form:Form}) {
  return <Card className=' hover:drop-shadow duration-500'>
    <CardHeader>
      <CardTitle className='flex items-center gap-2 justify-between'>
        <span className=' truncate font-bold'>
          {form.name}
        </span>
        {
          form.published && <Badge>Published</Badge>
        }
        {
          !form.published && <Badge variant={'destructive'}>Draft</Badge>
        }
      </CardTitle>
      <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
        {
          formatDistance(form.createdAt, new Date(), {
            addSuffix:true
          })
        }
        {
          !form.published && (
            <span className='flex items-center gap-2'>
              <LuView className=" text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className=" text-muted-foreground"/>
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )
        }
      </CardDescription>
    </CardHeader>
    <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
      {form.description || 'No description.'}
    </CardContent>
    <CardFooter className=' gap-4 flex items-center justify-center'>
      {form.published && (
        <Button asChild className=' w-full mt-2 text-sm gap-4'>
          <Link href={`/forms/${form.id}`} >View submissions <BiRightArrowAlt/></Link>
        </Button>
      )}  
      {!form.published && (
        <Button asChild className=' w-full mt-2 text-sm gap-4'>
          <Link href={`/builder/${form.id}`} >Edit form <FaEdit/></Link>
        </Button>
      )}  
    </CardFooter>
  </Card>
}