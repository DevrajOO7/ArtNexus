import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Notification = {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
};

const DUMMY_NOTIFICATIONS = [
    { title: "Artwork Sold", message: "Your piece 'Neon Dreams' just sold for ₹45,000!", time: "Just now" },
    { title: "New Message", message: "A collector sent you a message about 'Abstract Thoughts'.", time: "2 min ago" },
    { title: "Price Alert", message: "'Sunset Bouevard' dropped 10% in price.", time: "1 hour ago" },
    { title: "Event Reminder", message: "Virtual Exhibition starts in 15 minutes.", time: "2 hours ago" },
];

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 'initial-1', ...DUMMY_NOTIFICATIONS[3], read: false }
    ]);
    const [hasUnread, setHasUnread] = useState(true);

    // Simulate incoming notifications for demo purposes
    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            if (count < 3) {
                const newNotif = {
                    id: `sim-${Date.now()}`,
                    ...DUMMY_NOTIFICATIONS[2 - count],
                    read: false
                };
                setNotifications(prev => [newNotif, ...prev]);
                setHasUnread(true);
                count++;
            } else {
                clearInterval(interval);
            }
        }, 15000); // Send a new notification every 15 seconds for the demo (max 3)

        return () => clearInterval(interval);
    }, []);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setHasUnread(false);
    };

    return (
        <DropdownMenu onOpenChange={() => setHasUnread(false)}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative px-2">
                    <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    {hasUnread && (
                        <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2">
                    <DropdownMenuLabel className="p-0 font-semibold text-lg">Notifications</DropdownMenuLabel>
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                        Mark all read
                    </Button>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 cursor-default focus:bg-muted/50">
                                <div className="flex items-center justify-between w-full mb-1">
                                    <span className={`font-medium text-sm ${!notif.read ? 'text-primary' : ''}`}>
                                        {notif.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No new notifications
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown;
