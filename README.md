<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>LinguaX — AI Cultural &amp; Slang Translator</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="background-glow glow-one"></div>
    <div class="background-glow glow-two"></div>

    <main class="app">

        <!-- HEADER -->
        <header class="topbar">

            <div class="brand">
                <div class="brand-icon">◉</div>

                <div>
                    <h1>Lingua<span>X</span></h1>
                    <p>AI Cultural &amp; Slang Translator</p>
                </div>
            </div>

            <div class="status">
                <span class="status-dot"></span>
                AI ONLINE
            </div>

        </header>


        <!-- HERO -->
        <section class="hero">

            <div class="hero-badge">
                ✦ CONTEXT-AWARE LANGUAGE AI
            </div>

            <h2>
                Understand the
                <span>meaning behind words.</span>
            </h2>

            <p>
                Translate language, slang, tone and cultural context —
                not just words.
            </p>

        </section>


        <!-- CONVERSATIONAL INPUT -->
        <section class="conversation-panel">

            <div class="panel-header">

                <div>
                    <span class="eyebrow">YOUR MESSAGE</span>
                    <h3>What do you want to understand?</h3>
                </div>

                <span class="ai-symbol">✦</span>

            </div>

            <textarea id="inputText" placeholder="Try something like:
マジで、このライブやばい！
மச்சி, அந்த படம் செம!"></textarea>

            <div class="input-footer">

                <span class="hint">
                    Supports English · Tamil · Japanese
                </span>

                <button onclick="analyze()" id="analyzeButton" style="opacity: 1;">
                    <span>Analyze</span>
                    <span class="arrow">→</span>
                </button>

            </div>

        </section>


        <!-- LOADER -->
        <div id="loader" style="display: none;">

            <div class="loader-ring"></div>

            <div>
                <strong>Understanding context...</strong>
                <small>Analyzing language, slang &amp; culture</small>
            </div>

        </div>


        <!-- RESULTS -->
        <section id="result" class="results">

            <div class="result-card language-card">

                <div class="card-label">
                    <span class="card-icon">◉</span>
                    Language
                </div>

                <div class="card-value">
                    Japanese
                </div>

            </div>


            <div class="result-card tone-card">

                <div class="card-label">
                    <span class="card-icon">◌</span>
                    Tone
                </div>

                <div class="card-value">
                    Neutral
                </div>

            </div>


            <div class="result-card culture-card">

                <div class="card-label">
                    <span class="card-icon">✦</span>
                    Cultural Context
                </div>

                

                    <div class="slang-item">

                        <div class="culture-title">
                            マジで
                        </div>

                        <div class="culture-meaning">
                            Emphatic confirmation, common across all ages, softer in tone than English slang equivalents.
                        </div>

                        
                            <div class="meta">
                                Cultural concept:
                                expressing_strong_agreement
                            </div>
                            

                    </div>

                

            </div>


            <div class="result-card slang-card">

                <div class="card-label">
                    <span class="card-icon">◆</span>
                    Slang Intelligence
                </div>

                
                    <div class="slang-item">

                        <div class="slang-word">
                            マジで
                        </div>

                        <div class="slang-meaning">
                            Used to express sincerity/emphasis, or as a question meaning 'really?!'
                        </div>

                        <div class="meta">
                            internet_slang
                            ·
                            japanese
                        </div>

                    </div>
                

            </div>


            <div class="result-card translation-card">

                <div class="card-label">
                    <span class="card-icon">↔</span>
                    AI Interpretation
                </div>

                <div class="culture-meaning">

                    Your message was analyzed for
                    language, tone, slang and cultural
                    context.

                </div>

            </div>

        </section>


        <!-- FOOTER -->
        <footer>

            <span>LINGUAX</span>

            <span>AI Cultural Intelligence</span>

            <span>© 2026</span>

        </footer>

    </main>


    <script src="script.js"></script>

<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>


</body></html>
