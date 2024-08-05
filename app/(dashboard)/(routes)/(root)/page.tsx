import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { courses } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <CoursesList items={courses} />
    </div>
  );
}
