import { LucideProps, User } from "lucide-react";

export const Icons = {
  user: User,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-handshake"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  discord: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515c-.211.373-.453.889-.623 1.293a18.947 18.947 0 00-5.598 0c-.179-.41-.412-.923-.63-1.293a19.75 19.75 0 00-4.888 1.515c-3.12 4.673-3.96 9.228-3.59 13.745a19.785 19.785 0 005.963 1.512c.485-.645.921-1.328 1.305-2.05a13.735 13.735 0 01-2.136-.87c.18-.117.356-.24.527-.365a17.25 17.25 0 004.1 1.07c1.249 0 2.482-.12 3.68-.36.343.715.729 1.388 1.155 2.025a19.736 19.736 0 005.963-1.515c.37-4.517-.47-9.072-3.588-13.745zM9.655 15.207c-1.18 0-2.15-1.088-2.15-2.422 0-1.336.957-2.425 2.15-2.425 1.193 0 2.163 1.089 2.163 2.425 0 1.334-.97 2.422-2.163 2.422zm4.686 0c-1.18 0-2.15-1.088-2.15-2.422 0-1.336.957-2.425 2.15-2.425 1.193 0 2.163 1.089 2.163 2.425 0 1.334-.97 2.422-2.163 2.422z"
        fill="#7289DA"
      />
    </svg>
  ),
  github: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.793-.26.793-.577v-2.024c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.236 1.839 1.236 1.07 1.834 2.809 1.304 3.495.996.108-.776.42-1.304.763-1.605-2.665-.305-5.466-1.335-5.466-5.932 0-1.31.467-2.382 1.236-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.523 11.523 0 013.004-.404 11.5 11.5 0 013.003.404c2.294-1.552 3.301-1.23 3.301-1.23.654 1.653.241 2.873.118 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.921.43.37.816 1.102.816 2.222v3.293c0 .319.192.69.799.573C20.565 21.798 24 17.301 24 12 24 5.373 18.627 0 12 0z"
        fill="#181717"
      />
    </svg>
  ),

  // facebook: (props: LucideProps) => {
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="24"
  //     height="24"
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     stroke="currentColor"
  //     stroke-width="2"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //     className="lucide lucide-facebook"
  //   >
  //     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  //   </svg>;
  // },
  // commentReply: MessageSquare,
};
