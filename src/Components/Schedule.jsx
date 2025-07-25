import React, { useEffect, useState } from "react";
import axios from "axios";
import SchedulePopup from "./SchedulePopup";

const Schedule = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findAllEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
          const response = await axios.get(
            `${API_BASE_URL}/admin/getEvents`
          
        );
        if (response.data) {
          setEvents(response.data); // Set the fetched events to the events state
          console.log("Fetched events:", response.data);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    findAllEvents();
  }, [API_BASE_URL]);

  const handleCreateEvent = async (newEvent) => {
    setIsLoading(true);
    try {
      console.log(newEvent);
      const formData = new FormData();
      formData.append("startTime", newEvent.startTime);
      formData.append("endTime", newEvent.endTime);
      newEvent.selectedDays.forEach((day) => {
        formData.append("days", day);
      });

      formData.append(
        "repeat",
        newEvent.repeatOption === "No Repeat"
          ? "No Repeat"
          : newEvent.repeatOption
      );
      formData.append("trackInfo", JSON.stringify(newEvent.trackInfo));
      formData.append("overrun", newEvent.overrun);
      if (newEvent.image) formData.append("image", newEvent.image);

        const response = await axios.post(
           `${API_BASE_URL}/admin/schedule`
       ,
        formData,
        {
          withCredentials: true,
        }
      );

      //   // Add the new event to the existing events list
      //   // Use the response data if it contains the created event, otherwise use the newEvent with generated ID
      const createdEvent = response.data;
      setEvents([...events, createdEvent]);

      console.log(response);
      setShowPopup(false);
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${API_BASE_URL}/admin/deleteEvent/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== id)
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.response?.data?.message || "Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Event Scheduler</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create Event"}
        </button>
      </div>

      {isLoading && events.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-4 text-lg">No events scheduled yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={() => handleDeleteEvent(event._id)}
            />
          ))}
        </div>
      )}

      {showPopup && (
        <SchedulePopup
          onClose={() => !isLoading && setShowPopup(false)}
          onCreate={handleCreateEvent}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

const EventCard = ({event, onDelete }) => {
  const [image, setImage] = useState(event.eventThumbnail || null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
      key={event._id}
    >
      {image ? (
        <img
          src={`${import.meta.env.VITE_CLOUDFRONT_DOMAIN_NAME}/${image
            .split("/")
            .pop()}`}
          alt="Event thumbnail"
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {event.startTime} - {event.endTime}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {event.days?.join(", ") || "No days selected"} |{" "}
              {event.repeat || "No repeat"}
            </p>
          </div>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Thumbnail
          </label>
          <div className="flex items-center">
            <label className="flex-1 cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-md border border-gray-300 text-sm transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              Choose Image
            </label>
            {image && (
              <button
                onClick={() => setImage(null)}
                className="ml-2 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
