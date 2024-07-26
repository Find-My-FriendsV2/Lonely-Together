"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { CreateEventPayload1 } from '@/lib/validators/event';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from "@/hooks/use-custom-toast";

// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

const Page = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number>(3);
  const [rsvpDeadline, setRsvpDeadline] = useState<string>('');
  const [eventType, setEventType] = useState<string>('IN_PERSON');
  const [visibility, setVisibility] = useState<string>('PUBLIC');

  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: createEvent, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateEventPayload1 = {
        name,
        description,
        location,
        startDateTime: new Date(startDateTime).toISOString(),
        endDateTime: new Date(endDateTime).toISOString(),
        maxParticipants: Number(maxParticipants),
        rsvpDeadline: new Date(rsvpDeadline).toISOString(),
        eventType,
        visibility,
      };

      console.log('Payload being sent:', payload);

      const { data } = await axios.post('/api/event', payload);
      console.log(data)
      return data as string;
},
onSuccess: (data) => {
    router.push(`/r/${data}`);
},
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Event already exists',
            description: 'Please choose different parameters',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: 'Something Went Wrong',
            description: 'Please choose different parameters',
            variant: 'destructive',
          });
        }


        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: 'There was an error',
        description: 'Could not create an event',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-8 rounded-lg shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Create an Event</h1>
        </div>
        <hr className="bg-gray-500 h-px" />

        {/* Event Name */}
        <div>
          <label className="block text-lg font-medium">Name</label>
          <p className="text-xs pb-2">Event name including capitalization cannot be changed</p>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-6" />
        </div>

        {/* Event Description */}
        <div>
          <label className="block text-lg font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={3}
          ></textarea>
        </div>

        {/* Event Location */}
        <div>
          <label className="block text-lg font-medium">Location</label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full" />
        </div>

        {/* Event Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium">Start Date and Time</label>
            <Input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} />
          </div>
          <div>
            <label className="block text-lg font-medium">End Date and Time</label>
            <Input type="datetime-local" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} />
          </div>
        </div>

        {/* Event Participants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium">Max Participants (3-20)</label>
            <Input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(Number(e.target.value))} min="3" max="20" />
          </div>
        </div>

        {/* RSVP Deadline */}
        <div>
          <label className="block text-lg font-medium">RSVP Deadline</label>
          <Input type="datetime-local" value={rsvpDeadline} onChange={(e) => setRsvpDeadline(e.target.value)} />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-lg font-medium">Event Type</label>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full p-2 border rounded-lg">
            <option value="ONLINE">Online</option>
            <option value="IN_PERSON">In Person</option>
            <option value="HYBRID">Hybrid</option>
          </select>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-lg font-medium">Visibility</label>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="w-full p-2 border rounded-lg">
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
            <option value="FRIENDS_ONLY">Friends Only</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button isLoading={isLoading} disabled={name.length === 0} onClick={createEvent}>
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
