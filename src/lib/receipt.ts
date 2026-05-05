import EscPosEncoder from "esc-pos-encoder";
import { CartItem } from "@/types";

interface ReceiptData {
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "cash" | "qris";
  amountPaid: number;
  change: number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(n);

export function buildReceipt(data: ReceiptData): Uint8Array {
  const encoder = new EscPosEncoder();

  let result = encoder
    .initialize()
    .align("center")
    .bold(true)
    .line("COFFEE NEW CAMMARY")
    .bold(false)
    .line("Jl. Contoh Alamat No. 123")
    .line("Telp: 0812-3456-7890")
    .line("================================")
    .align("left");

  if (data.customerName) {
    result = result.line(`Pelanggan: ${data.customerName}`);
  }
  if (data.customerPhone) {
    result = result.line(`No. HP: ${data.customerPhone}`);
  }
  result = result
    .line(`Tanggal: ${new Date().toLocaleString("id-ID")}`)
    .line("--------------------------------");

  for (const item of data.items) {
    result = result
      .line(item.name)
      .line(`  ${item.qty} x Rp ${fmt(item.price)}  = Rp ${fmt(item.qty * item.price)}`);
  }

  result = result
    .line("--------------------------------")
    .line(`Subtotal:      Rp ${fmt(data.subtotal)}`)
    .line(`Pajak (10%):   Rp ${fmt(data.tax)}`)
    .bold(true)
    .line(`TOTAL:         Rp ${fmt(data.total)}`)
    .bold(false)
    .line("--------------------------------")
    .line(`Bayar (${data.paymentMethod.toUpperCase()}): Rp ${fmt(data.amountPaid)}`)
    .line(`Kembali:       Rp ${fmt(data.change)}`)
    .line("================================")
    .align("center")
    .line("")
    .line("Terima Kasih!")
    .line("Coffee New Cammary")
    .line("")
    .newline()
    .newline()
    .newline()
    .cut();

  return result.encode();
}

export async function printViaBluetooth(receiptData: Uint8Array): Promise<void> {
  if (!navigator.bluetooth) {
    throw new Error("Web Bluetooth API tidak tersedia di browser ini");
  }

  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: ["000018f0-0000-1000-8000-00805f9b34fb"] }],
    optionalServices: ["000018f0-0000-1000-8000-00805f9b34fb"],
  });

  const server = await device.gatt!.connect();
  const service = await server.getPrimaryService(
    "000018f0-0000-1000-8000-00805f9b34fb"
  );
  const characteristic = await service.getCharacteristic(
    "00002af1-0000-1000-8000-00805f9b34fb"
  );

  const chunkSize = 100;
  for (let i = 0; i < receiptData.length; i += chunkSize) {
    const chunk = receiptData.slice(i, i + chunkSize);
    await characteristic.writeValue(chunk);
  }

  server.disconnect();
}
