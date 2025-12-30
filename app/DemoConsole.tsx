"use client";

import { useMemo, useState, type ReactNode } from "react";

import { backendFetch, normalizeBaseUrl, type BackendResponse } from "@/lib/backend";

function pretty(v: unknown): string {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

function genRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "req_" + Math.random().toString(16).slice(2);
}

function toInt(raw: string, fallback: number): number {
  const n = Number(raw);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function toFloat(raw: string, fallback: number): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function ResponseBox({ res }: { res: BackendResponse | null }) {
  if (!res) return <div className="muted small">No response yet.</div>;

  return (
    <div>
      <div className="row">
        <span className={"badge " + (res.ok ? "ok" : "err")}>
          {res.ok ? "OK" : "ERROR"} {res.status}
        </span>
        <span className="badge">X-Request-ID: {res.requestId || "(none)"}</span>
      </div>

      <details>
        <summary className="small">Show response JSON</summary>
        <div className="code">{res.rawText ? res.rawText : pretty(res.data)}</div>
      </details>
    </div>
  );
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>{title}</h2>
        <span className="badge">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

export default function DemoConsole() {
  const envBase = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000").toString();

  const [baseUrl, setBaseUrl] = useState(envBase);
  const baseUrlNorm = useMemo(() => normalizeBaseUrl(baseUrl), [baseUrl]);

  const [requestIdMode, setRequestIdMode] = useState<"auto" | "fixed">("auto");
  const [fixedRequestId, setFixedRequestId] = useState(
    (process.env.NEXT_PUBLIC_DEFAULT_REQUEST_ID || "").toString()
  );

  function resolveRequestId(): string | undefined {
    if (requestIdMode === "fixed") {
      const v = fixedRequestId.trim();
      return v ? v : undefined;
    }
    return genRequestId();
  }

  const [resHealth, setResHealth] = useState<BackendResponse | null>(null);

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadSeed, setUploadSeed] = useState("1337");
  const [trainRatio, setTrainRatio] = useState("0.8");
  const [evalRatio, setEvalRatio] = useState("0.1");
  const [holdoutRatio, setHoldoutRatio] = useState("0.1");
  const [resUpload, setResUpload] = useState<BackendResponse | null>(null);

  const [datasetId, setDatasetId] = useState("");
  const [resSummary, setResSummary] = useState<BackendResponse | null>(null);

  const [sampleSplit, setSampleSplit] = useState<"train" | "eval" | "holdout">("train");
  const [sampleN, setSampleN] = useState("5");
  const [sampleLabel, setSampleLabel] = useState("");
  const [resSample, setResSample] = useState<BackendResponse | null>(null);

  const [trainBackend, setTrainBackend] = useState<"tfidf_logreg" | "hf_transformer">("tfidf_logreg");
  const [trainSeed, setTrainSeed] = useState("1337");
  const [trainThreshold, setTrainThreshold] = useState("0.5");
  const [resTrain, setResTrain] = useState<BackendResponse | null>(null);

  const [modelId, setModelId] = useState("");

  const [inferText, setInferText] = useState("Urgent: verify your UPI to avoid block\nCongratulations! You won a prize, click now");
  const [inferExplain, setInferExplain] = useState(true);
  const [inferThreshold, setInferThreshold] = useState("");
  const [resInfer, setResInfer] = useState<BackendResponse | null>(null);

  const [evalSplit2, setEvalSplit2] = useState<"train" | "eval" | "holdout">("holdout");
  const [evalThreshold2, setEvalThreshold2] = useState("");
  const [resEval, setResEval] = useState<BackendResponse | null>(null);

  const [mutateText, setMutateText] = useState("Your bank account will be blocked. Verify now.");
  const [mutateCandidates, setMutateCandidates] = useState("5");
  const [mutateSimilarity, setMutateSimilarity] = useState("0.55");
  const [mutateRequireAnchors, setMutateRequireAnchors] = useState(true);
  const [resMutate, setResMutate] = useState<BackendResponse | null>(null);

  const [advSplit, setAdvSplit] = useState<"train" | "eval" | "holdout">("holdout");
  const [advRounds, setAdvRounds] = useState("2");
  const [advSeeds, setAdvSeeds] = useState("10");
  const [advCandidatesPerSeed, setAdvCandidatesPerSeed] = useState("3");
  const [advThreshold, setAdvThreshold] = useState("0.5");
  const [advSimilarity, setAdvSimilarity] = useState("0.55");
  const [advRequireAnchors, setAdvRequireAnchors] = useState(true);
  const [resAdvRun, setResAdvRun] = useState<BackendResponse | null>(null);

  const [retrainSplit, setRetrainSplit] = useState<"train" | "eval" | "holdout">("train");
  const [retrainRounds, setRetrainRounds] = useState("1");
  const [retrainSeeds, setRetrainSeeds] = useState("10");
  const [retrainCandidatesPerSeed, setRetrainCandidatesPerSeed] = useState("3");
  const [retrainHardMax, setRetrainHardMax] = useState("100");
  const [retrainSimilarity, setRetrainSimilarity] = useState("0.55");
  const [retrainRequireAnchors, setRetrainRequireAnchors] = useState(true);
  const [resAdvRetrain, setResAdvRetrain] = useState<BackendResponse | null>(null);

  const [runId, setRunId] = useState("");
  const [resRobustness, setResRobustness] = useState<BackendResponse | null>(null);

  const [historyLimit, setHistoryLimit] = useState("20");
  const [resHistory, setResHistory] = useState<BackendResponse | null>(null);

  async function doGet(path: string, setter: (r: BackendResponse) => void) {
    const r = await backendFetch(baseUrlNorm, path, {
      method: "GET",
      requestId: resolveRequestId(),
    });
    setter(r);
  }

  async function doPostJson(path: string, body: unknown, setter: (r: BackendResponse) => void) {
    const r = await backendFetch(baseUrlNorm, path, {
      method: "POST",
      body,
      requestId: resolveRequestId(),
    });
    setter(r);
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 className="h1">ScamEvo Demo UI</h1>
          <div className="muted small">
            Step-by-step UI to demo the ScamEvo backend. You can follow the flow from top to bottom.
          </div>
        </div>
        <a className="small" href={baseUrlNorm + "/docs"} target="_blank" rel="noreferrer">
          Open Backend Docs
        </a>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="kv">
          <label>Backend URL</label>
          <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />

          <label>X-Request-ID</label>
          <div className="row" style={{ marginBottom: 0 }}>
            <select
              value={requestIdMode}
              onChange={(e) => setRequestIdMode(e.target.value as "auto" | "fixed")}
              style={{ maxWidth: 220 }}
            >
              <option value="auto">auto per request</option>
              <option value="fixed">fixed</option>
            </select>
            <input
              placeholder="fixed request id"
              value={fixedRequestId}
              onChange={(e) => setFixedRequestId(e.target.value)}
              disabled={requestIdMode !== "fixed"}
              style={{ flex: 1, minWidth: 220 }}
            />
          </div>
        </div>

        <div className="row">
          <button onClick={() => doGet("/health", setResHealth)}>1) Check backend health</button>
          <span className="muted small">Expected: 200 OK</span>
        </div>

        <ResponseBox res={resHealth} />
      </div>

      <div className="grid">
        <Step title="2) Upload dataset" subtitle="POST /dataset/upload">
          <div className="muted small" style={{ marginBottom: 8 }}>
            Choose a dataset file (CSV/JSON/JSONL/SMSSpamCollection). After upload, we auto-fill `dataset_id`.
          </div>

          <div className="row">
            <input type="file" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
          </div>

          <div className="row">
            <div style={{ flex: 1, minWidth: 160 }}>
              <label>seed</label>
              <input value={uploadSeed} onChange={(e) => setUploadSeed(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label>train_ratio</label>
              <input value={trainRatio} onChange={(e) => setTrainRatio(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label>eval_ratio</label>
              <input value={evalRatio} onChange={(e) => setEvalRatio(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label>holdout_ratio</label>
              <input value={holdoutRatio} onChange={(e) => setHoldoutRatio(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <button
              onClick={async () => {
                const rid = resolveRequestId();
                if (!uploadFile) {
                  setResUpload({
                    ok: false,
                    status: 0,
                    requestId: rid || null,
                    headers: {},
                    data: null,
                    rawText: "Please choose a file first.",
                  });
                  return;
                }

                const options = {
                  seed: toInt(uploadSeed, 1337),
                  train_ratio: toFloat(trainRatio, 0.8),
                  eval_ratio: toFloat(evalRatio, 0.1),
                  holdout_ratio: toFloat(holdoutRatio, 0.1),
                };

                const fd = new FormData();
                fd.append("file", uploadFile);
                fd.append("options", JSON.stringify(options));

                const r = await backendFetch(baseUrlNorm, "/dataset/upload", {
                  method: "POST",
                  formData: fd,
                  requestId: rid,
                });
                setResUpload(r);

                const maybe = r.data as any;
                if (r.ok && maybe && typeof maybe.dataset_id === "string") {
                  setDatasetId(maybe.dataset_id);
                }
              }}
            >
              Upload dataset
            </button>

            <span className="muted small">
              Current dataset_id: <span className="badge">{datasetId || "(none yet)"}</span>
            </span>
          </div>

          <ResponseBox res={resUpload} />
        </Step>

        <Step title="3) Confirm dataset" subtitle="GET /dataset/summary + /dataset/sample">
          <div className="row">
            <div style={{ flex: 1, minWidth: 240 }}>
              <label>dataset_id</label>
              <input value={datasetId} onChange={(e) => setDatasetId(e.target.value)} />
            </div>
            <button
              onClick={() =>
                doGet(`/dataset/summary?dataset_id=${encodeURIComponent(datasetId)}`, setResSummary)
              }
            >
              Fetch summary
            </button>
          </div>
          <ResponseBox res={resSummary} />

          <div style={{ height: 8 }} />

          <div className="row">
            <select
              value={sampleSplit}
              onChange={(e) => setSampleSplit(e.target.value as any)}
              style={{ maxWidth: 180 }}
            >
              <option value="train">train</option>
              <option value="eval">eval</option>
              <option value="holdout">holdout</option>
            </select>
            <input
              placeholder="n"
              value={sampleN}
              onChange={(e) => setSampleN(e.target.value)}
              style={{ maxWidth: 120 }}
            />
            <input
              placeholder="label (optional: 0 or 1)"
              value={sampleLabel}
              onChange={(e) => setSampleLabel(e.target.value)}
              style={{ maxWidth: 220 }}
            />
            <button
              onClick={() => {
                const params = new URLSearchParams();
                params.set("dataset_id", datasetId);
                params.set("split", sampleSplit);
                params.set("n", sampleN || "5");
                if (sampleLabel.trim()) params.set("label", sampleLabel.trim());
                doGet(`/dataset/sample?${params.toString()}`, setResSample);
              }}
            >
              Sample rows
            </button>
          </div>
          <ResponseBox res={resSample} />
        </Step>

        <Step title="4) Train detector" subtitle="POST /detector/train">
          <div className="muted small" style={{ marginBottom: 8 }}>
            This trains a model and returns a `model_id`. For fast local demos, use TF-IDF + Logistic Regression.
          </div>

          <div className="row">
            <div style={{ flex: 1, minWidth: 240 }}>
              <label>dataset_id</label>
              <input value={datasetId} onChange={(e) => setDatasetId(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <label>backend</label>
              <select value={trainBackend} onChange={(e) => setTrainBackend(e.target.value as any)}>
                <option value="tfidf_logreg">tfidf_logreg (recommended)</option>
                <option value="hf_transformer">hf_transformer</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div style={{ flex: 1, minWidth: 160 }}>
              <label>seed</label>
              <input value={trainSeed} onChange={(e) => setTrainSeed(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label>detection_threshold</label>
              <input value={trainThreshold} onChange={(e) => setTrainThreshold(e.target.value)} />
            </div>
            <button
              onClick={() => {
                const body = {
                  dataset_id: datasetId,
                  backend: trainBackend,
                  seed: toInt(trainSeed, 1337),
                  detection_threshold: toFloat(trainThreshold, 0.5),
                };
                doPostJson("/detector/train", body, (r) => {
                  setResTrain(r);
                  const maybe = r.data as any;
                  if (r.ok && maybe && typeof maybe.model_id === "string") {
                    setModelId(maybe.model_id);
                  }
                });
              }}
            >
              Train
            </button>
          </div>

          <div className="row">
            <span className="muted small">
              Current model_id: <span className="badge">{modelId || "(none yet)"}</span>
            </span>
          </div>

          <ResponseBox res={resTrain} />
        </Step>

        <Step title="5) Try inference" subtitle="POST /detector/infer">
          <div className="muted small" style={{ marginBottom: 8 }}>
            Paste one message per line. The API will return scam probability and prediction.
          </div>

          <div className="row">
            <div style={{ flex: 1, minWidth: 240 }}>
              <label>model_id</label>
              <input value={modelId} onChange={(e) => setModelId(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <label>optional threshold override</label>
              <input
                placeholder="(blank = use persisted per-model threshold)"
                value={inferThreshold}
                onChange={(e) => setInferThreshold(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={inferExplain}
                onChange={(e) => setInferExplain(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              explain
            </label>
          </div>

          <label>texts</label>
          <textarea value={inferText} onChange={(e) => setInferText(e.target.value)} />

          <div className="row">
            <button
              onClick={() => {
                const texts = inferText
                  .split("\n")
                  .map((t) => t.trim())
                  .filter((t) => t.length > 0);

                const body: any = {
                  model_id: modelId,
                  texts,
                  explain: inferExplain,
                };

                if (inferThreshold.trim()) {
                  body.detection_threshold = toFloat(inferThreshold, 0.5);
                }

                doPostJson("/detector/infer", body, setResInfer);
              }}
            >
              Run inference
            </button>
          </div>

          <ResponseBox res={resInfer} />
        </Step>

        <Step title="6) Evaluate model" subtitle="GET /detector/evaluate">
          <div className="muted small" style={{ marginBottom: 8 }}>
            Evaluates on train/eval/holdout split and returns accuracy/precision/recall/f1.
          </div>

          <div className="row">
            <div style={{ flex: 1, minWidth: 240 }}>
              <label>model_id</label>
              <input value={modelId} onChange={(e) => setModelId(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <label>dataset_id</label>
              <input value={datasetId} onChange={(e) => setDatasetId(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <select value={evalSplit2} onChange={(e) => setEvalSplit2(e.target.value as any)} style={{ maxWidth: 180 }}>
              <option value="train">train</option>
              <option value="eval">eval</option>
              <option value="holdout">holdout</option>
            </select>
            <input
              placeholder="threshold override (optional)"
              value={evalThreshold2}
              onChange={(e) => setEvalThreshold2(e.target.value)}
              style={{ maxWidth: 240 }}
            />
            <button
              onClick={() => {
                const params = new URLSearchParams();
                params.set("model_id", modelId);
                params.set("dataset_id", datasetId);
                params.set("split", evalSplit2);
                if (evalThreshold2.trim()) params.set("detection_threshold", evalThreshold2.trim());
                doGet(`/detector/evaluate?${params.toString()}`, setResEval);
              }}
            >
              Evaluate
            </button>
          </div>

          <ResponseBox res={resEval} />
        </Step>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h2>Optional: Research / Attack simulation</h2>
        <div className="muted small">
          If you get 403 on these endpoints, enable in backend: SCAMEVO_RESEARCH_MODE=1 and SCAMEVO_DO_NOT_DEPLOY=1.
        </div>

        <div style={{ height: 8 }} />

        <details>
          <summary>7) Generator mutate</summary>
          <div className="row">
            <label style={{ flex: 1 }}>
              text
              <input value={mutateText} onChange={(e) => setMutateText(e.target.value)} />
            </label>
          </div>
          <div className="row">
            <label style={{ flex: 1 }}>
              num_candidates
              <input value={mutateCandidates} onChange={(e) => setMutateCandidates(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              similarity_threshold
              <input value={mutateSimilarity} onChange={(e) => setMutateSimilarity(e.target.value)} />
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={mutateRequireAnchors}
                onChange={(e) => setMutateRequireAnchors(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              require_anchors
            </label>
            <button
              onClick={() => {
                const body = {
                  text: mutateText,
                  num_candidates: toInt(mutateCandidates, 5),
                  seed: 1337,
                  actions: ["lexical_swap", "obfuscate", "urgency"],
                  similarity_threshold: toFloat(mutateSimilarity, 0.55),
                  require_anchors: mutateRequireAnchors,
                };
                doPostJson("/generator/mutate", body, setResMutate);
              }}
            >
              Mutate
            </button>
          </div>
          <ResponseBox res={resMutate} />
        </details>

        <div style={{ height: 8 }} />

        <details>
          <summary>8) Adversarial run (attack simulation)</summary>
          <div className="row">
            <label style={{ flex: 1 }}>
              dataset_id
              <input value={datasetId} onChange={(e) => setDatasetId(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              model_id (optional)
              <input value={modelId} onChange={(e) => setModelId(e.target.value)} />
            </label>
          </div>
          <div className="row">
            <label style={{ flex: 1 }}>
              split
              <select value={advSplit} onChange={(e) => setAdvSplit(e.target.value as any)}>
                <option value="train">train</option>
                <option value="eval">eval</option>
                <option value="holdout">holdout</option>
              </select>
            </label>
            <label style={{ flex: 1 }}>
              rounds
              <input value={advRounds} onChange={(e) => setAdvRounds(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              seeds_per_round
              <input value={advSeeds} onChange={(e) => setAdvSeeds(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              candidates_per_seed
              <input value={advCandidatesPerSeed} onChange={(e) => setAdvCandidatesPerSeed(e.target.value)} />
            </label>
          </div>
          <div className="row">
            <label style={{ flex: 1 }}>
              detection_threshold
              <input value={advThreshold} onChange={(e) => setAdvThreshold(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              similarity_threshold
              <input value={advSimilarity} onChange={(e) => setAdvSimilarity(e.target.value)} />
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={advRequireAnchors}
                onChange={(e) => setAdvRequireAnchors(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              require_anchors
            </label>
            <button
              onClick={() => {
                const body: any = {
                  dataset_id: datasetId,
                  split: advSplit,
                  rounds: toInt(advRounds, 2),
                  seeds_per_round: toInt(advSeeds, 10),
                  candidates_per_seed: toInt(advCandidatesPerSeed, 3),
                  detection_threshold: toFloat(advThreshold, 0.5),
                  similarity_threshold: toFloat(advSimilarity, 0.55),
                  require_anchors: advRequireAnchors,
                  seed: 1337,
                  dry_run: false,
                };
                if (modelId.trim()) body.model_id = modelId.trim();

                doPostJson("/adversarial/run", body, (r) => {
                  setResAdvRun(r);
                  const maybe = r.data as any;
                  if (r.ok && maybe && typeof maybe.run_id === "string") {
                    setRunId(maybe.run_id);
                  }
                });
              }}
            >
              Run attack simulation
            </button>
          </div>
          <div className="row">
            <span className="muted small">
              Latest run_id: <span className="badge">{runId || "(none yet)"}</span>
            </span>
          </div>
          <ResponseBox res={resAdvRun} />
        </details>

        <div style={{ height: 8 }} />

        <details>
          <summary>9) Adversarial retrain (defense)</summary>
          <div className="muted small" style={{ marginBottom: 8 }}>
            Generates attacks, selects hard examples, augments training set, retrains defender, and reports deltas.
          </div>

          <div className="row">
            <label style={{ flex: 1 }}>
              dataset_id
              <input value={datasetId} onChange={(e) => setDatasetId(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              model_id
              <input value={modelId} onChange={(e) => setModelId(e.target.value)} />
            </label>
          </div>

          <div className="row">
            <label style={{ flex: 1 }}>
              split
              <select value={retrainSplit} onChange={(e) => setRetrainSplit(e.target.value as any)}>
                <option value="train">train</option>
                <option value="eval">eval</option>
                <option value="holdout">holdout</option>
              </select>
            </label>
            <label style={{ flex: 1 }}>
              rounds
              <input value={retrainRounds} onChange={(e) => setRetrainRounds(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              seeds_per_round
              <input value={retrainSeeds} onChange={(e) => setRetrainSeeds(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              candidates_per_seed
              <input value={retrainCandidatesPerSeed} onChange={(e) => setRetrainCandidatesPerSeed(e.target.value)} />
            </label>
          </div>

          <div className="row">
            <label style={{ flex: 1 }}>
              hard_max_examples
              <input value={retrainHardMax} onChange={(e) => setRetrainHardMax(e.target.value)} />
            </label>
            <label style={{ flex: 1 }}>
              similarity_threshold
              <input value={retrainSimilarity} onChange={(e) => setRetrainSimilarity(e.target.value)} />
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={retrainRequireAnchors}
                onChange={(e) => setRetrainRequireAnchors(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              require_anchors
            </label>
            <button
              onClick={() => {
                const body = {
                  dataset_id: datasetId,
                  model_id: modelId,
                  split: retrainSplit,
                  rounds: toInt(retrainRounds, 1),
                  seeds_per_round: toInt(retrainSeeds, 10),
                  candidates_per_seed: toInt(retrainCandidatesPerSeed, 3),
                  similarity_threshold: toFloat(retrainSimilarity, 0.55),
                  require_anchors: retrainRequireAnchors,
                  hard_max_examples: toInt(retrainHardMax, 100),
                  seed: 1337,
                  dry_run: false,
                  retrain_backend: "tfidf_logreg",
                };

                doPostJson("/adversarial/retrain", body, (r) => {
                  setResAdvRetrain(r);
                  const maybe = r.data as any;
                  if (r.ok && maybe && typeof maybe.run_id === "string") {
                    setRunId(maybe.run_id);
                  }
                });
              }}
            >
              Run adversarial retrain
            </button>
          </div>

          <div className="row">
            <span className="muted small">
              Latest run_id: <span className="badge">{runId || "(none yet)"}</span>
            </span>
          </div>

          <ResponseBox res={resAdvRetrain} />
        </details>

        <div style={{ height: 8 }} />

        <details>
          <summary>10) Robustness report</summary>
          <div className="row">
            <label style={{ flex: 1 }}>
              run_id
              <input value={runId} onChange={(e) => setRunId(e.target.value)} />
            </label>
            <button
              onClick={() => doGet(`/robustness/report?run_id=${encodeURIComponent(runId)}`, setResRobustness)}
            >
              Fetch report
            </button>
          </div>
          <ResponseBox res={resRobustness} />
        </details>

        <div style={{ height: 8 }} />

        <details>
          <summary>11) Run history</summary>
          <div className="row">
            <input
              placeholder="limit"
              value={historyLimit}
              onChange={(e) => setHistoryLimit(e.target.value)}
              style={{ maxWidth: 140 }}
            />
            <button
              onClick={() => doGet(`/adversarial/history?limit=${encodeURIComponent(historyLimit)}`, setResHistory)}
            >
              Fetch history
            </button>
          </div>
          <ResponseBox res={resHistory} />
        </details>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h2>What you should show in a demo</h2>
        <div className="muted small" style={{ marginTop: 8 }}>
          1) Check Health<br />
          2) Upload dataset (shows dataset ingestion + splitting)<br />
          3) Train detector (shows supervised training + metrics)<br />
          4) Run inference on a few messages (shows detection + explainability)<br />
          5) Evaluate holdout (shows final metrics)<br />
          6) Optional: adversarial run / retrain + robustness report
        </div>
      </div>
    </div>
  );
}
