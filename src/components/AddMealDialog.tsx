import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AddIcon from '@mui/icons-material/Add';
import AddMealForm from "./AddMealForm";


export function AddMealDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='bg-gradient text-white rounded-xl flex justify-center items-center w-[300px] h-12 hover:shadow-lg hover:shadow-neutral-700'>
                    <AddIcon />  <span className='font-semibold'>Add Meal</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Meal</DialogTitle>
                    <DialogDescription>
                        Register your meal by filling the form below
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <AddMealForm />
                </div>

            </DialogContent>
        </Dialog>
    )
}
