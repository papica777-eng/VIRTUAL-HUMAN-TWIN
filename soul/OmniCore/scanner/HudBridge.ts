// ═══════════════════════════════════════════════════════════════════════════
// 👁️ HUD_BRIDGE.ts — THE VISUAL OVERWRITE ENGINE
// Architect: Dimitar Prodromov
// ═══════════════════════════════════════════════════════════════════════════

import * as fs from 'fs';

const HUD_MMAP_PATH = 'z:\\soul\\HUD_MMAP.bin';
const SLOT_SIZE = 128;
const HEADER_SIZE = 16;
const MMAP_SIZE = HEADER_SIZE + (SLOT_SIZE * 4);

export interface AeternaTelemetry {
    sequence: bigint;
    txHash: string;
    entropy: number;
    compute: number;
    realMrr: number;
    sentinelHeat: number;
    exitNodeIp: string;
    obfuscationEntropy: number;
    mevProfit?: number;
    mevPool?: number;
    mevTime?: number;
    glucose?: number;
    insulin?: number;
    ph?: number;
    oxygen?: number;
    empathyAnomaly?: number;
    maxDeviation?: number;
    source?: 'ingress' | 'hardware';
}

export class HudBridge {
    private buffer: Buffer;
    private fd: number | null = null;
    private isRunning: boolean = false;
    private lastIngressSeq: bigint = 0n;
    private lastHardwareSeq: bigint = 0n;

    constructor() {
        this.buffer = Buffer.alloc(MMAP_SIZE);
    }

    public startStream(onUpdate: (data: AeternaTelemetry) => void) {
        try {
            this.fd = fs.openSync(HUD_MMAP_PATH, 'r');
            this.isRunning = true;
            console.log(`/// [HUD_BRIDGE] Connected to ${HUD_MMAP_PATH}. Awaiting Dual-Zone Telemetry. ///`);

            this.poll(onUpdate);
        } catch (error) {
            console.error("/// [HUD_BRIDGE] FATAL: Cannot mount HUD_MMAP.bin ///", error);
        }
    }

    public stopStream() {
        this.isRunning = false;
        if (this.fd !== null) {
            fs.closeSync(this.fd);
            this.fd = null;
        }
    }

    private poll(onUpdate: (data: AeternaTelemetry) => void) {
        if (!this.isRunning || this.fd === null) return;

        fs.readSync(this.fd, this.buffer, 0, MMAP_SIZE, 0);

        // Zone 1: Ingress (Header[0..7], Slots 0 & 1)
        const ingressActive = Number(this.buffer.readBigUInt64LE(0));
        const ingressStable = ingressActive === 0 ? 1 : 0;
        const ingressOffset = HEADER_SIZE + (ingressStable * SLOT_SIZE);
        const ingressSeq = this.buffer.readBigUInt64LE(ingressOffset);

        if (ingressSeq % 2n === 0n && ingressSeq !== this.lastIngressSeq) {
            this.lastIngressSeq = ingressSeq;
            const tel = this.parseSlot(ingressOffset, ingressSeq, 'ingress');
            tel.source = 'ingress';
            onUpdate(tel);
        }

        // Zone 2: Hardware (Header[8..15], Slots 2 & 3)
        const hwActive = Number(this.buffer.readBigUInt64LE(8));
        const hwStable = hwActive === 0 ? 3 : 2; // Slots 2 & 3
        const hwOffset = HEADER_SIZE + (hwStable * SLOT_SIZE);
        const hwSeq = this.buffer.readBigUInt64LE(hwOffset);

        if (hwSeq % 2n === 0n && hwSeq !== this.lastHardwareSeq) {
            this.lastHardwareSeq = hwSeq;
            const tel = this.parseSlot(hwOffset, hwSeq, 'hardware');
            tel.source = 'hardware';
            onUpdate(tel);
        }

        setTimeout(() => this.poll(onUpdate), 15);
    }

    private parseSlot(offset: number, sequence: bigint, source: 'ingress' | 'hardware'): AeternaTelemetry {
        // Извличане на TX Hash (32 байта)
        const txHashBuffer = this.buffer.subarray(offset + 8, offset + 40);
        // Изчистваме null байтовете за чист ASCII
        const txHash = txHashBuffer.toString('utf8').replace(/\0/g, '');

        // Извличане на float64 стойностите
        const entropy = this.buffer.readDoubleLE(offset + 40);
        const compute = this.buffer.readDoubleLE(offset + 48);
        const realMrr = this.buffer.readDoubleLE(offset + 56);
        const sentinelHeat = this.buffer.readDoubleLE(offset + 64);

        // [NOETIC SHROUD] Извличане на IP адреса
        const ip1 = this.buffer.readUInt8(offset + 72);
        const ip2 = this.buffer.readUInt8(offset + 73);
        const ip3 = this.buffer.readUInt8(offset + 74);
        const ip4 = this.buffer.readUInt8(offset + 75);
        const exitNodeIp = `${ip1}.${ip2}.${ip3}.${ip4}`;

        // [NOETIC SHROUD] Извличане на E_noise (Float32)
        const obfuscationEntropy = this.buffer.readFloatLE(offset + 76);

        const telemetry: AeternaTelemetry = {
            sequence, txHash, entropy, compute, realMrr, sentinelHeat, exitNodeIp, obfuscationEntropy,
            source
        };

        if (source === 'ingress') {
            telemetry.glucose = this.buffer.readDoubleLE(offset + 80);
            telemetry.insulin = this.buffer.readDoubleLE(offset + 88);
            telemetry.ph = this.buffer.readDoubleLE(offset + 96);
            telemetry.oxygen = this.buffer.readDoubleLE(offset + 104);
            telemetry.empathyAnomaly = Number(this.buffer.readBigUInt64LE(offset + 112));
            telemetry.maxDeviation = this.buffer.readDoubleLE(offset + 120);
        } else {
            telemetry.mevProfit = this.buffer.readDoubleLE(offset + 80);
            telemetry.mevPool = this.buffer.readDoubleLE(offset + 88);
            telemetry.mevTime = this.buffer.readDoubleLE(offset + 96);
        }

        return telemetry;
    }
}