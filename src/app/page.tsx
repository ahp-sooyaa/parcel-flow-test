import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-8">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Parcel Flow UI Foundation</CardTitle>
              <CardDescription>
                shadcn/ui baseline components are now configured for this project.
              </CardDescription>
            </div>
            <Badge variant="secondary">Internal Dashboard</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <Input placeholder="Search by merchant, receiver, or voucher code" />
            <Button>Create Parcel</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voucher</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PF-10231</TableCell>
                <TableCell>Shwe Mart</TableCell>
                <TableCell>
                  <Badge>pending</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PF-10232</TableCell>
                <TableCell>Mingalar Store</TableCell>
                <TableCell>
                  <Badge variant="outline">assigned</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="outline">View Dispatch Board</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
