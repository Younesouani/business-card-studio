import { create } from 'zustand';
import { z } from 'zod';

// Strict Zod Security Validation Schema for runtime validation
export const cardValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long").trim(),
  title: z.string().min(1, "Professional title is required").max(60).trim(),
  subtitle: z.string().min(1, "Subtitle is required").max(60).trim(),
  email: z.string().email("Invalid email address").max(100).trim(),
  phone: z.string().min(5, "Phone number is too short").max(30).trim(),
  igHandle: z.string().min(1, "Instagram handle is required").max(30).trim(),
  fbHandle: z.string().min(1, "Facebook handle is required").max(30).trim(),
  qrUrl: z.string().url("Must be a valid security-approved URL").max(256),
  accentTheme: z.enum(['gold', 'silver']),
});

// Infer TypeScript structure directly from our security validation rules
export type CardStateData = z.infer<typeof cardValidationSchema>;

interface CardStoreState {
  cardData: CardStateData;
  isFlipped: boolean;
  setField: (field: keyof CardStateData, value: string) => void;
  setAccentTheme: (theme: 'gold' | 'silver') => void;
  toggleCardFlip: () => void;
  setCardFlip: (flipped: boolean) => void;
}

// Initializing the central zero-trust reactive state matrix
export const useCardStore = create<CardStoreState>((set) => ({
  cardData: {
    name: "Ilyas Ouani",
    title: "Photographer & Videographer",
    subtitle: "Photography & Visuals",
    email: "ilyasouani@gmail.com",
    phone: "+212 715-884998",
    igHandle: "@ilyas.ouani",
    fbHandle: "@ilyasouani",
    qrUrl: "https://instagram.com/ilyas.ouani",
    accentTheme: "gold",
  },
  isFlipped: false,
  setField: (field, value) => set((state) => ({
    cardData: { ...state.cardData, [field]: value }
  })),
  setAccentTheme: (theme) => set((state) => ({
    cardData: { ...state.cardData, accentTheme: theme }
  })),
  toggleCardFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),
  setCardFlip: (flipped) => set({ isFlipped: flipped }),
}));

